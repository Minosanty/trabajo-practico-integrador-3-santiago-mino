import { useEffect, useState } from "react";
import { Approuter } from "./router/AppRouter";
import { Navbar } from "./components/Navbar";
import { Loading } from "./components/Loading";
import { Footer } from "./components/Footer";

export const App = () => {
  const [authStatus,setAuthStatus] = useState("checking")
  const auth = async () => {
    try {
        const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:3000/api/profile",{
        headers:{"Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"},
        credentials:"include",
      });
      if(res.ok){
        setAuthStatus("authenticated")
      } else {
        setAuthStatus("unauthenticated")
      }
    } catch (error) {
      console.log(error);
      setAuthStatus("unauthenticated")
    }
  };
  useEffect(() => {
    auth()
  },[]);

  const handleLogin = () => {
    setAuthStatus("authenticated")
  }
  const handleLogout = () => {
    setAuthStatus("unauthenticated")
  }

  if(authStatus === "checking"){
    return(
      <div>
        <Loading/>
      </div>
    )
  }
   
  return (
    <>
    <Navbar authStatus={authStatus} onLogout={handleLogout}/>

    <Approuter
      authStatus={authStatus}
      onLogin={handleLogin}
      onLogout={handleLogout}
    />

    <Footer/>
    </>
  )
}
