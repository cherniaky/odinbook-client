import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import "font-awesome/css/font-awesome.min.css";
import { AuthProvider } from './contexts/authContext';

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <Router basename="/odinbook-client">
                <App />
            </Router>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

