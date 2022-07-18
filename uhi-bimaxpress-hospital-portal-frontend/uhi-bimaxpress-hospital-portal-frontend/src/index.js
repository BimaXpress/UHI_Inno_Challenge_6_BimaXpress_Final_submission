import "./index.css";
import "./antd.css";

import React, { Suspense } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleWare from "redux-thunk";
import reducers from "./rootreducer";
import App from "./App";
import { ToastContainer } from "react-toastify";

const store = createStore(reducers, applyMiddleware(thunkMiddleWare));

render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);
