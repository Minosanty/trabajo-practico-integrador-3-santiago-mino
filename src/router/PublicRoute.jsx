import { Navite, Outlet} from "react-router";

export const PublicRoute = (authStatus) => {
  return authStatus === "authenticated" ? <Navigate to="/Home"/> : <Outlet/>   
}
