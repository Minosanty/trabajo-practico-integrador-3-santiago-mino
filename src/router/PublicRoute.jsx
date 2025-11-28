import { Navigate, Outlet } from "react-router"


export const Public = ({authStatus}) => {
    return authStatus === "authenticated" ? <Navigate to="/home"/>:<Outlet/>
}