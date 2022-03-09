import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "font-awesome/css/font-awesome.min.css";
import { AuthProvider } from "./contexts/authContext";
//import Store from "./store/store";

ReactDOM.render(
    <AuthProvider>
        <Router basename="/odinbook-client">
            <App />
        </Router>
    </AuthProvider>,
    document.getElementById("root")
);
