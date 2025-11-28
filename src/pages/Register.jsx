import { Link } from "react-router";
import { useForm } from "../hooks/useForm";
import { useState } from "react";
import { Loading } from "../components/Loading";

export function Register({ onLoginSuccess }) {
  const { handleReset, handleChange, user } = useForm({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    dni: "",
  });
  useForm;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const usuario = {
      name: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
      password: user.password,
    };
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(usuario),
      });
      const data = res.json();

      if (res.ok) {
        onLoginSuccess();
      } else {
        alert(data.message || "Error al registrar el usuario");
        handleReset();
      }
    } catch (error) {
      alert("Error interno del servidor");
      handleReset();
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <main className="min-h-screen bg-sky-50 flex items-center justify-center px-4 py-8">
        {loading && <Loading />}
        <div className="w-full max-w-md bg-white border-2 border-sky-300 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-sky-900 mb-8">Regístrate</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-sky-700 mb-2">Nombre de Usuario</label>
              <input
                type="text"
                name="username"
                value={user.username}
                placeholder="Tu usuario"
                required
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-2.5 border-2 border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sky-900"
              />
            </div>
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-sky-700 mb-2">Nombre</label>
              <input
                type="text"
                name="firtname"
                value={user.firstname}
                placeholder="Tu nombre"
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-2.5 border-2 border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sky-900"
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-sky-700 mb-2">Apellido</label>
              <input
                type="text"
                name="lastname"
                value={user.lastname}
                placeholder="Tu apellido"
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-2.5 border-2 border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sky-900"
              />
            </div>
            <div>
              <label htmlFor="dni" className="block text-sm font-medium text-sky-700 mb-2">DNI</label>
              <input
                type="text"
                name="dni"
                value={user.dni}
                placeholder="Tu DNI"
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-2.5 border-2 border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sky-900"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-sky-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                placeholder="tu@email.com"
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-2.5 border-2 border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sky-900"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-sky-700 mb-2">Contraseña</label>
              <input
                type="password"
                name="password"
                value={user.password}
                placeholder="Tu contraseña"
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-2.5 border-2 border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sky-900"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition shadow-lg shadow-green-500/30"
            >
              Registrarse
            </button>
          </form>
          <p className="text-center text-sky-700 mt-6">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-green-600 hover:text-green-700 font-bold">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
