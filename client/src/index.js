import React from "react";
import { render }  from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import App from "./App";
import "foundation-sites/dist/css/foundation.min.css";
import "./index.css";

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    document.getElementById("root")
);
