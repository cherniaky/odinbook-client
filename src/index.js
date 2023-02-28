import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "font-awesome/css/font-awesome.min.css";
import { AuthProvider } from "./contexts/authContext";
import { ChatProvider } from "./contexts/chatContext";
import { NotificationsProvider } from "./contexts/notifyContext";
//import Store from "./store/store";

ReactDOM.render(
    <AuthProvider>
        <NotificationsProvider>
            <Router>
                <App />
            </Router>
        </NotificationsProvider>
    </AuthProvider>,
    document.getElementById("root")
);
