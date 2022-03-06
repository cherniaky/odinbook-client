import { Route, Navigate, Outlet } from "react-router-dom";
import * as ROUTES from "./ROUTES";

export default function ProtectedRoute({ isAuth }) {
    return isAuth ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
}
