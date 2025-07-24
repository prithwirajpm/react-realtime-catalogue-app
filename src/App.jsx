import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import {
  startSignalRConnection,
  invokeCatalogueUpdate,
} from "./services/signalRService";

function App() {
  useEffect(() => {
    const hasProducts = localStorage.getItem("products");
    const hasCategories = localStorage.getItem("categories");

    if (!hasProducts || !hasCategories) {
      startSignalRConnection((data) => {
        if (data.products) console.log("Products stored.");
        if (data.categories) console.log("Categories stored.");
      });

      setTimeout(() => {
        invokeCatalogueUpdate({
          type: "Product",
          index: 1,
          numOfItems: 9999,
          selectedCategoryId: null,
          screenName: "HomeScreen",
        });

        invokeCatalogueUpdate({
          type: "Category",
          index: 1,
          numOfItems: null,
          selectedCategoryId: null,
          screenName: "HomeScreen",
        });
      }, 1000);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
