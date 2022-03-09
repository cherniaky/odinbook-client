import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { storeContext } from "..";
import * as ROUTES from "./ROUTES";

function ProtectedRoute({ isAuth }) {
   // const { store } = useContext(storeContext);

    if (!isAuth) {
        return <Navigate to={ROUTES.LOGIN} />;
    }

    return <Outlet />;
}
export default observer(ProtectedRoute);
