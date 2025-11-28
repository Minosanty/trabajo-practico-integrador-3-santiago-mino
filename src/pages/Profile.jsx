import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Loading } from "../components/Loading";

export const Profile = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const profile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUserData(data.user);
      } else {
        console.log("Error al obtener usuario ,Se esta cerrando sessión");
        onLogout();
        navigate("/login");
      }
    } catch (error) {
      console - log("Error interno del servidor");
      onLogout();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    profile();
  }, []);
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        credentials: "include",
      });
    } catch (error) {
      console.log("Error del servidor", error);
    } finally {
      onLogout();
    }
  };
  return (
    <main className="min-h-screen bg-sky-50 py-12 px-4">
      <section className="container mx-auto max-w-2xl">
        {loading && <Loading />}
        <div className="bg-white border-2 border-sky-300 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-green-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {/* Si el usuario tiene Name entonces colocara la primer letra en mayuscula caso contrario colocara "U" */}
              {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-sky-900">
                {userData?.name
                  ? `${userData.name} ${userData.lastname}`
                  : "Mi Perfil"}
              </h1>
              <p className="text-sky-600 mt-1">Mi información personal</p>
            </div>
          </div>
          {/* Funciona que aplica una division horizontal */}
          <hr className="border-sky-300 my-6" />
          { !loading && userData && (
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-sky-50 rounded-lg">
              <span className="text-sky-700 font-medium">ID del usuario</span>
              <p className="text-sky-900 font-semibold">{userData.id}</p>
            </div>
            <div className="flex justify-between items-center p-4 bg-sky-50 rounded-lg">
              <span className="text-sky-700 font-medium">Nombre</span>
              <p className="text-sky-900 font-semibold">{userData.name}</p>
            </div>
            <div className="flex justify-between items-center p-4 bg-sky-50 rounded-lg">
              <span className="text-sky-700 font-medium">Apellido</span>
              <p className="text-sky-900 font-semibold">{userData.lastname}</p>
            </div>
            {userData.email && (
              <div className="flex justify-between items-center p-4 bg-sky-50 rounded-lg">
                <span className="text-sky-700 font-medium">Email</span>
                <p className="text-sky-900 font-semibold">{userData.email}</p>
              </div>
            )}
        
            <button 
              onClick={handleLogout}
              className="w-full mt-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition shadow-lg shadow-red-500/30"
            >
              Cerrar sesión
            </button>
          </div>)}
        </div>
      </section>
          
    </main>
          
);
};
