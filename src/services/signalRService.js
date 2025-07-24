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
    console.log("Received:", { type, payload });

    if (type === "Product" && payload?.products?.products) {
      const products = payload.products.products;
      localStorage.setItem("products", JSON.stringify(products));
      onReceive({ products });
    }

    if (type === "Category" && payload?.categories?.categories) {
      const categories = payload.categories.categories;
      localStorage.setItem("categories", JSON.stringify(categories));
      onReceive({ categories });
    }
  });

  try {
    await connection.start();
    console.log("SignalR connected");

    await connection.send("JoinCompanyGroup", {
      companyId: COMPANY_ID,
      branchId: BRANCH_ID,
    });

    console.log("Joined Company Group");
  } catch (err) {
    console.error("SignalR connection failed:", err);
    setTimeout(() => startSignalRConnection(onReceive), 5000);
  }
};

export const invokeCatalogueUpdate = ({
  type = "Product",
  selectedCategoryId = null, // maps to `id`
  index = 1,
  numOfItems = null,
  customerId = null,
}) => {
  if (
    !connection ||
    connection.state !== signalR.HubConnectionState.Connected
  ) {
    console.warn("SignalR not connected");
    return;
  }

  const payload = [
    type,
    COMPANY_ID,
    BRANCH_ID,
    customerId ?? null,
    selectedCategoryId ?? null, // this is `id` in backend
    index ?? null,
    numOfItems ?? null,
    null,
    null,
    null,
    null,
  ];

  console.log("Invoking SendCatalogueUpdate with:", payload);

  return connection.invoke("SendCatalogueUpdate", ...payload).catch((err) => {
    console.error("Server error on SendCatalogueUpdate:", err);
  });
};
