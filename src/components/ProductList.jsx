import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { invokeCatalogueUpdate } from "../services/signalRService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  useEffect(() => {
    setLoading(true);
    invokeCatalogueUpdate({
      type: "Product",
      selectedCategoryId: categoryId,
      index: 1,
      numOfItems: 20,
    }).then((data) => {
      setProducts(data?.data || []);
      setLoading(false);
    });
  }, [categoryId]);

  return (
    <div>
      <h2>Product Listing</h2>
      {loading ? <p>Loading...</p> : null}
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <img src={p.image || "/placeholder.png"} alt={p.name} width="100" />
            <p>{p.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
