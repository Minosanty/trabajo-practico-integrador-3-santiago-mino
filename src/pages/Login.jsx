import { useState } from "react";
import { useForm } from "../hooks/useForm"
import { Loading } from "../components/Loading";
import { Link } from "react-router";


export const Login = ({onLoginSuccess}) =>{
    const {handleReset,handleChange,user} = useForm({
        username:"",
        password:"",
    })
    useForm;
    const [loading,setLoading] = useState(false)
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const userRes = await fetch("http://localhost:3000/api/login",{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                credentials:"include",
                body:(JSON.stringify(user))
            } )
            const userData = await userRes.json()

            if(userRes.ok){
                onLoginSuccess()
            } else {
                alert(userData.message || "Credencial incorrecta")
                handleReset()
            }
        } catch (error) {
            console.log(error)
            alert("Error interno del servidor")
            handleReset()
            
        }finally{
            setLoading(false)
        }
        
    }
    return(
        <>
            <main className="min-h-screen bg-sky-50 flex items-center justify-center px-4">
                {loading && <Loading/>}
                <div className="w-full max-w-md bg-white border-2 border-sky-300 rounded-2xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-center text-sky-900 mb-8">Iniciar Sesión</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-sky-700 mb-2">
                                Nombre de Usuario
                            </label>
                            <input 
                                type="text" 
                                placeholder="Tu usuario" 
                                name="username" 
                                value={user.username} 
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border-2 border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sky-900"
                                required
                            /> 
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-sky-700 mb-2">
                                Contraseña
                            </label>
                            <input 
                                type="password" 
                                placeholder="Tu contraseña" 
                                name="password" 
                                value={user.password} 
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border-2 border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sky-900"
                                required
                            />
                        </div>
                        <button 
                            type="submit"
                            className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition shadow-lg shadow-green-500/30"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                    <p className="text-center text-sky-700 mt-6">
                        ¿No tienes una cuenta?{" "}
                        <Link to="/register" className="text-green-600 hover:text-green-700 font-bold">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </main>
           
        </>
    )
}