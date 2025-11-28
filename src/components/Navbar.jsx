import { Link } from "react-router";

export function Navbar({authStatus,onLogout}) {
    
      const handleLogoutClick = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión en el backend:", error);
    } finally {
      onLogout();
    }
  };
    return(
        <nav className="bg-gradient-to-r from-sky-100 to-sky-200 border-b-2 border-sky-300 shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">
                        <span className="text-sky-700">Trabajo</span> <span className="text-green-600">Integrador III</span>
                    </h1>
                </div>
                <div className="flex items-center gap-6">
        
                    {authStatus === "authenticated" ? (
                        <>
                            <Link
                                to="/home"
                                className="text-sky-700 hover:text-green-600 transition font-medium hover:underline"
                            >
                                Inicio
                            </Link>
                            <Link
                                to="/task"
                                className="text-sky-700 hover:text-green-600 transition font-medium hover:underline"
                            >
                                Tareas
                            </Link>
                            <Link
                                to="/profile"
                                className="text-sky-700 hover:text-green-600 transition font-medium hover:underline"
                            >
                                Perfil
                            </Link>
                            <button
                                onClick={handleLogoutClick}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition shadow-md shadow-green-500/30"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-sky-700 hover:text-green-600 transition font-medium hover:underline"
                            >
                                Iniciar sesión
                            </Link>
                            <Link
                                to="/register"
                                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg font-medium transition shadow-md"
                            >
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}