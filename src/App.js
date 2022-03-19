import "./styles/App.css";
import GlobalStyle from "./styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { lightTheme, darkTheme } from "./assets/themes";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./helpers/ProtectedRoutes";
import Login from "./pages/Login";
import { AuthContext, AuthProvider } from "./contexts/authContext";
import * as ROUTES from "./helpers/ROUTES";
import ClipLoader from "react-spinners/ClipLoader";
import SignUp from "./pages/SignUp";
import { NavBar } from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Profile from "./pages/Profile";

const AppDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70px;
`;

const LoaderDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

function App() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    function toggleTheme() {
        if (theme == "light") {
            localStorage.setItem("theme", "dark");
            return setTheme("dark");
        }
        localStorage.setItem("theme", "light");
        return setTheme("light");
    }

    const { authState, dispatch } = useContext(AuthContext);

    if (authState.loading) {
        return (
            <LoaderDiv>
                {" "}
                <ClipLoader color="lightblue" loading={true} size={150} />
            </LoaderDiv>
        );
    }

    return (
        <>
            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
                <GlobalStyle />
                <NavBar toggleTheme={toggleTheme} />
                
                <AppDiv>
                    <Routes>
                        <Route
                            exact
                            path={ROUTES.LOGIN}
                            element={
                                authState.isAuth ? (
                                    <Navigate to={ROUTES.DASHBOARD} />
                                ) : (
                                    <Login />
                                )
                            }
                        ></Route>
                        <Route
                            exact
                            path={ROUTES.SIGN_UP}
                            element={
                                authState.isAuth ? (
                                    <Navigate to={ROUTES.DASHBOARD} />
                                ) : (
                                    <SignUp />
                                )
                            }
                        ></Route>
                        <Route
                            exact
                            path="/"
                            element={
                                <ProtectedRoute isAuth={authState.isAuth} />
                            }
                        >
                            <Route
                                exact
                                path={ROUTES.DASHBOARD}
                                element={<Dashboard />}
                            ></Route>
                            <Route
                                exact
                                path={ROUTES.SEARCH}
                                element={<Search />}
                            ></Route>
                            <Route
                                exact
                                path={ROUTES.PROFILE}
                                element={<Profile />}
                            ></Route>
                        </Route>
                    </Routes>
                </AppDiv>
            </ThemeProvider>
        </>
    );
}

export default App;
