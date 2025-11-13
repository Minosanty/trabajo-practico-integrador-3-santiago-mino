import { Navigate, Outlet } from "react-router";

export const PrivateRouter = ({authSatutus}) => {
  return  authSatutus === "autheticated"?<Outlet/> : <Navigate to="/Login" />; 
}; 

