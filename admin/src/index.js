import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";
import App from "./App";
import { History } from "./history";
import "./i18n";
import "./styles/main.less";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <History />
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
