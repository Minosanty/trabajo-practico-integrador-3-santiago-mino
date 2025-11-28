import { Navigate, Outlet } from "react-router";
import { Navbar } from "../components/Navbar";

export const Private = ({authStatus}) =>{
    return authStatus === "authenticated" ? <Outlet/> : <Navigate to="/login"/>
    
}