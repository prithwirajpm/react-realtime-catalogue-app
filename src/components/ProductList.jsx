import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../assets/placeholder.png";
import ActiveLastBreadcrumb from "./ActiveLastBreadcrumb";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState("");

  const categoryList = [
    { name: "All Categories", value: "" },
    { name: "Breakfast", value: "6006" },
    { name: "Testsea food", value: "6002" },
  ];

  useEffect(() => {
    const localProducts = localStorage.getItem("products");
    if (localProducts) {
      setProducts(JSON.parse(localProducts));
    }
  }, []);

  const filteredProducts =
    categories === ""
      ? products
      : products.filter((item) => item?.categoryId == categories);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold m-4">All Products</h2>

        <select
          className="border p-2 m-4"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        >
          {categoryList.map((item, index) => (
            <option key={index} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <ActiveLastBreadcrumb />
      <div className="product-grid">
        {filteredProducts.map((p, index) => (
          <div className="custom-card shadow" key={index}>
            <img
              src={p.image || placeholderImage}
              alt={p.productName}
              onError={(e) => (e.target.src = placeholderImage)}
              style={{ width: "100%", height: "100px", objectFit: "cover" }}
            />
            <div className="p-1">
              <label className="block font-bold text-sm">{p.productName}</label>
              <label className="block text-sm text-gray-600">₹{p.mrp}</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
