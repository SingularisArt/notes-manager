import { CssBaseline } from "@mui/material";

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { store } from "../redux/store";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
