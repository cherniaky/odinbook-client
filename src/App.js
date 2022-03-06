import "./styles/App.css";
import GlobalStyle from "./styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import React, { useContext, useState } from "react";
import { lightTheme, darkTheme } from "./assets/themes";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./helpers/ProtectedRoutes";
import { Login } from "./pages/Login";
import { AuthContext, AuthProvider } from "./contexts/authContext";
import * as ROUTES from "./helpers/ROUTES";


const AppDiv= styled.div`
    display:flex ;
    flex-direction:column ;
    align-items:center ;
`

function App() {
    const [theme, toggleTheme] = useState("light");

    const { isAuth } = useContext(AuthContext);

    return (
        <>
            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
                <AppDiv>
                <GlobalStyle />
                    <Routes>
                        <Route
                            exact
                            path={ROUTES.LOGIN}
                            element={<Login />}
                        ></Route>
                        <Route
                            exact
                            path={ROUTES.SIGN_UP}
                            element={<>sign</>}
                        ></Route>
                        <Route
                            exact
                            path={ROUTES.DASHBOARD}
                            element={<ProtectedRoute isAuth={isAuth} />}
                        >
                            <Route
                                exact
                                path="/secret"
                                element={<>secrete</>}
                            ></Route>
                        </Route>
                    </Routes>
                </AppDiv>
            </ThemeProvider>
        </>
    );
}

export default App;
