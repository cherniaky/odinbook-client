import React, { createContext, useReducer, useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState({});

    async function login(email, password) {
        try {
            let response;

            response = await AuthService.login(email, password);
            // console.log(response);
            Cookies.set("refreshToken", response.data.refreshToken, {
                expires: 15,
            });
            localStorage.setItem("token", response.data.accessToken);
            setIsAuth(true);
            setUser(response.data.user);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };