import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
  rootElement
);
