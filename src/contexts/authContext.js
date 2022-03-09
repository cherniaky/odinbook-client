import React, { createContext, useReducer, useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "../http";

const AuthContext = createContext();

const authReducer = async (authStatePromise, action) => {
    const authState = await authStatePromise;
    switch (action.type) {
        case "login": {
            try {
                const { email, password } = action.payload;
                //  const socket = connectSocket(userID);
                //let response;
                // setIsAuth(false);
                let response = await AuthService.login(email, password);
                // console.log(response);
                Cookies.set("refreshToken", response.data.refreshToken, {
                    expires: 15,
                });
                localStorage.setItem("token", response.data.accessToken);

                return {
                    ...authState,
                    isAuth: true,
                    token: response.data.accessToken,
                    user: response.data.user,
                    socket: "",
                };
            } catch (error) {
                return {
                    ...authState,
                    error: "Invalid credentials",
                };
            }
        }
        case "loginSample": {
            try {
                //const { email, password } = action.payload;
                //  const socket = connectSocket(userID);
                let response;
                //setIsAuth(false);
                response = await AuthService.loginAsGuest();

                //console.log(response);
                Cookies.set("refreshToken", response.data.refreshToken, {
                    expires: 15,
                });
                localStorage.setItem("token", response.data.accessToken);
                //  setIsAuth(true);
                // console.log("is auth", isAuth);
                // setUser(response.data.user);

                return {
                    ...authState,
                    isAuth: true,
                    token: response.data.accessToken,
                    user: response.data.user,
                    socket: "",
                };
            } catch (error) {
                return {
                    ...authState,
                    error: "login sample eroor",
                };
            }
        }
        case "checkAuth": {
            try {
                const response = await axios.get(`${API_URL}/auth/refresh`, {
                    withCredentials: true,
                });
                Cookies.set("refreshToken", response.data.refreshToken, {
                    expires: 15,
                });
                //console.log(response.data)
                localStorage.setItem("token", response.data.accessToken);
                // let i = true;
                // setIsAuth(true);
                //setUser(response.data.user);
                return {
                    ...authState,
                    isAuth: true,
                    token: response.data.accessToken,
                    user: response.data.user,
                    socket: "",
                };
            } catch (error) {
                return {
                    ...authState,
                    error: "check auth eroor",
                };
            }
        }
        case "logout": {
            localStorage.clear();
            // disconnectFromSocket();
            return {
                ...authState,
                isAuth: false,
                user: {},
                token: "",
                socket: "",
                error: null,
            };
        }
        case "toggleLoading": {
            //localStorage.clear();
            // disconnectFromSocket();
          //  console.log(authState);
            return {
                ...authState,
                loading: !authState.loading,
            };
        }
        default:
            return authState;
    }
};

const AuthProvider = ({ children }) => {
    // const [isAuth, setIsAuth] = useState(false);
    const initialState = {
        isAuth: false,
        token: null,
        user: null,
        socket: null,
        error: null,
        loading: true,
    };
    const [authState, dispatch] = useReducer(authReducer, initialState);
    const [authStateCopy, setAuthStateCopy] = useState(initialState);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch({
                type: "checkAuth",
            });
        }
        dispatch({
            type: "toggleLoading",
        });

        return () => {};
    }, []);

    useEffect(async () => {
        setAuthStateCopy(await authState);
        return () => {};
    }, [authState]);

    return (
        <AuthContext.Provider
            value={{
                authState: authStateCopy,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
