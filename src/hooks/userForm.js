import { useState } from "react";

export function useForm(initialValue){
    const[user,setUser] = useState({initialState:{}})
   
    const handleReset = (event) => {
        setUser(initialValue)
    }
    
    const handleChange = (event) => {
        const {name,value,type,checked} = event.target
        const newUser = type === "checkbox" ? checked : value;
        setUser((prevUser) => ({...prevUser, [name]:newUser}))
        // evita la "race condition" 
        // La "Race condition" ocurre cuando dos o mas procesos intentan acceder
        // y modificar el mismo campo compartido al mismo tiempo causando que 
        // el resultado final dependa de que peticion se ejecute antes 
        setUser({
            ...user,
            [name]:newUser
        })
    }
    return{
        user ,
        setUser,
        handleChange,
        handleReset,
    }
}