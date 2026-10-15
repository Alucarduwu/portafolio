import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Establish the layout before mounting: alternate worlds own the viewport.
const world = new URLSearchParams(window.location.search).get("world");
if (world === "space" || world === "metro") {
  document.documentElement.dataset.portfolioWorld = world;
} else {
  delete document.documentElement.dataset.portfolioWorld;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
