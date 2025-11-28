import { Navigate, Route, Routes } from "react-router"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Profile } from "../pages/Profile"
import { Tasks } from "../pages/Task"
import { Public } from "./PublicRouter"
import { Private } from "./PrivateRouter"
import { Register } from "../pages/Register"


export const Approuter = ({authStatus,onLogin, onLogout}) =>{
    return(
         <Routes>
        <Route element={<Public authStatus={authStatus}/>}>
        <Route path="/login" element={<Login onLoginSuccess={onLogin}/>}></Route>
        <Route path="/register" element={<Register onLoginSuccess={onLogin}/>}></Route>
        </Route>
        <Route element={<Private authStatus={authStatus}/>}>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/task" element={<Tasks/>}></Route>
            <Route path="/profile" element={<Profile onLogout={onLogout}/>}></Route>
        </Route>
        <Route path="*" element={<Navigate to={authStatus === "authenticated" ? "/home" : "/login"}/>}/>
    </Routes>
    )
   
}
