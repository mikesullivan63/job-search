import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import ResultsStore from "./models/ResultsStore";
import App from "./App";
import "foundation-sites/dist/css/foundation.min.css";
import "./index.css";

const store = ResultsStore.create({});

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
