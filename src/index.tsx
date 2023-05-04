import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.module.scss";

import App from "./components/app/app";

const root = createRoot(document.getElementById("root") as Element);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
