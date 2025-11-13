import React from 'react'
import { Navigante, Router, Route, Routes } from 'react-router-dom' 
import {Home} from '../pages/Home ';
import {Login} from '../pages/Login';
import {Register} from '../pages/Register';
import {Profile} from '../pages/Profile';
import {Tasks} from '../pages/Tasks';
import {PrivateRoute} from './PrivateRoute';
import {PublicRoute} from './PublicRoute';



export const AppRouter = () => {
  return (
    <Routes> 
      {/*rutas publicas */}
      <Route path= {<PublicRoute authStatus={authStatus} /> }>  
      <Route path= "/Login" element={<Login  onLoginSuccess={onLogin} />}/>
      <Route path="register" element={<Register onLoginSuccess={onLogin}/>}/>
      </Route>


      {/* <rutas privadas */}

      <Route path={<PrivateRoute authSatus={authStatus} /> }> 

      <Route path="/Home" element={<Home/> } /> 
      <Router path="/Profile" element={<Profile onLogout={onLongout}/> }/> 
     <Route path="/Tasks" element={<Tasks/>}/>
      
      
      </Route>

      {/* ruta por defecto */}

      <Route path="*" element={ <Navigate to={ authSatus === "authenticated" ? "/Home" : "/Login"} /> }/> 

      </Routes> 
  );
};

export default AppRouter; 
