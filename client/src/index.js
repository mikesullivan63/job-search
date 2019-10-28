import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import ResultsStore from "./models/ResultsStore";
import { loginService } from "./services/login";
import { searchService } from "./services/search";
import { jobService } from "./services/job";

import App from "./App";
//import "foundation-sites/dist/css/foundation.min.css";
import "./index.css";

const store = ResultsStore.create({});
loginService.setStore(store);
searchService.setStore(store);
jobService.setStore(store);

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
