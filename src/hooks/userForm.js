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