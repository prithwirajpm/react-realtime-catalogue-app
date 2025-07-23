import * as signalR from "@microsoft/signalr";

const API_BASE_URL = "https://admintest.xeniacatalogue.info";
const SIGNALR_URL = `${API_BASE_URL}/catalogueHub`;
const COMPANY_ID = 11;
const BRANCH_ID = 238;

let connection = null;

export const startSignalRConnection = async (onReceive) => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl("/catalogueHub")
    .withAutomaticReconnect({ nextRetryDelayInMilliseconds: () => 5000 })
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection.on("receivecatalogueupdate", (type, payload) => {
    console.log("📦 Raw Data Received:", { type, payload });

    if (type === "Product" && payload?.products?.products) {
      onReceive(payload.products.products); // send only the array
    } else {
      console.warn("⚠️ Unrecognized payload format:", { type, payload });
    }
  });

  try {
    await connection.start();
    console.log("✅ SignalR connected");
    await connection.send("JoinCompanyGroup", {
      companyId: COMPANY_ID,
      branchId: BRANCH_ID,
    });
  } catch (err) {
    console.error("❌ Connection error. Reconnecting in 5s", err);
    setTimeout(() => startSignalRConnection(onReceive), 5000);
  }
};

export const invokeCatalogueUpdate = ({
  type = "Product",
  selectedCategoryId,
  index = 1,
  numOfItems = 10,
  customerId = null,
}) => {
  if (
    !connection ||
    connection.state !== signalR.HubConnectionState.Connected
  ) {
    console.warn("SignalR connection is not in a connected state.");
    return;
  }
  return connection.invoke(
    "SendCatalogueUpdate",
    type,
    COMPANY_ID,
    BRANCH_ID,
    customerId,
    selectedCategoryId,
    index,
    numOfItems,
    null,
    null,
    null,
    null
  );
};
