import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function ActiveLastBreadcrumb() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" className="p-5">
        <Link to={"/"}>Home</Link>
        <Link>Product</Link>
      </Breadcrumbs>
    </div>
  );
}
