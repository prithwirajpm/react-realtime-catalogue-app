import React, { useEffect, useState } from "react";
import {
  startSignalRConnection,
  invokeCatalogueUpdate,
} from "../services/signalRService";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    startSignalRConnection((productList) => {
      setProducts(productList); // now this is just the array
      setLoading(false);
    });

    setTimeout(() => {
      invokeCatalogueUpdate({
        type: "Product",
        selectedCategoryId: undefined,
        index: 1,
        numOfItems: 10,
      });
    }, 1000);
  }, []);

  console.log("products", products);

  return (
    <div>
      <h2>Home - Product List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li
              key={p.id}
              onClick={() => navigate("/products?category=" + p.categoryId)}
            >
              {p.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
