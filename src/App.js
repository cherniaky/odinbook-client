import "./styles/App.css";
import { observer } from "mobx-react-lite";
import GlobalStyle from "./styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { lightTheme, darkTheme } from "./assets/themes";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./helpers/ProtectedRoutes";
import Login from "./pages/Login";
import { AuthContext, AuthProvider } from "./contexts/authContext";
import * as ROUTES from "./helpers/ROUTES";
import { storeContext } from ".";

const AppDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function App() {
    const [theme, toggleTheme] = useState("light");

    const { authState, dispatch } = useContext(AuthContext);

    return (
        <>
            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
                <AppDiv>
                    <GlobalStyle />
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
                                    <>sign</>
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
                                path="/"
                                element={<>secrete</>}
                            ></Route>

                        </Route>
                    </Routes>
                </AppDiv>
            </ThemeProvider>
        </>
    );
}

export default observer(App);
