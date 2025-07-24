import React, { useEffect, useState } from "react";
import {
  startSignalRConnection,
  invokeCatalogueUpdate,
} from "../services/signalRService";
import { Link, useNavigate } from "react-router-dom";
import imagesDefalut from "../assets/placeholder.png";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   startSignalRConnection((productList) => {
  //     setProducts(productList);
  //     setLoading(false);
  //   });

  //   setTimeout(() => {
  //     invokeCatalogueUpdate({
  //       type: "Product",
  //       selectedCategoryId: undefined,
  //       index: 1,
  //       numOfItems: 10,
  //     });
  //   }, 1000);
  // }, []);

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
      setLoading(false);
    }

    startSignalRConnection((productList) => {
      setProducts(productList);
      localStorage.setItem("products", JSON.stringify(productList));
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

  return (
    <div>
      <div className="m-4 flex justify-between">
        <div>
          <h1 className="font-bold text-2xl">Product</h1>
        </div>
        <button className="bg-blue-400 text-white hover:bg-blue-300 p-2 rounded">
          <Link to={"/products"}>View All</Link>
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-grid">
          {products.slice(0, 10)?.map((p, index) => (
            <div className="custom-card shadow" key={index}>
              <div>
                <img
                  src={p?.image || imagesDefalut}
                  alt={p?.productName}
                  style={{ width: "100%", height: "100px", objectFit: "cover" }}
                  onError={(e) => (e.target.src = "/placeholder.png")}
                />
              </div>
              <div className="p-1">
                <label className="block font-bold text-sm text-gray-800">
                  Name : {p?.productName}
                </label>
                <label className="block font-bold text-black text-sm">
                  Rate : ₹{p?.mrp}
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
