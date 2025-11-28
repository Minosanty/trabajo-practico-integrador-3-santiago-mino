import { useEffect, useState } from "react"
import { Loading } from "../components/Loading"
import { Link } from "react-router"



export const Home = () =>{
    const [userData,setUserData] = useState(null)
    const [task, setTask] = useState([])
    const [loading,setLoading] = useState(true)

    const Homedata = async () => {
       try {
         const userTask = fetch("http://localhost:3000/api/task",{
            credentials:"include"

        })
        const userData = fetch("http://localhost:3000/api/profile",{
            credentials:"include"
        })

        const [userRes,taskRes] = await Promise.all([
            userTask,
            userData
        ])
        if(userRes.ok){
            const profile = await userData.json();
            setUserData(profile.user)
        } else {
            console.log("Error al traer el usuario")
        }
        if(taskRes.ok){
            const task = await taskRes.json();
            setTask(userTask.task || (Array.isArray(userTask) ? userTask : []))
        } else {
            console.log("Error al cargar las Tareas")
        }
     
       } catch (error) {
        console.log("Error interno de servidor",error)
       } finally {
        setLoading(false)
       }
      
    }
     useEffect(() => {
        Homedata();
     },[]);
        const totalTask = task.length;
        const taskComplete = task.filter((task) => task.is_complete).length
        const taskPending = totalTask - taskComplete;

        if(loading){
          return(
            <main>
              <Loading/>
            </main>
          )
            
        }
        return (
    <main className="min-h-screen bg-sky-50 py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-sky-900 mb-2">
          Bienvenido,{" "}
          <span className="text-green-600">{userData?.name || "Usuario"}</span>
        </h1>
        <p className="text-sky-600 mb-8">Aquí puedes gestionar todas tus tareas</p>

      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         
          <div className="bg-white border-2 border-sky-300 rounded-2xl p-8 shadow-lg">
            <h3 className="text-5xl font-bold text-green-600 mb-2">{totalTask}</h3>
            <p className="text-sky-700 font-medium">Total de Tareas</p>
          </div>

         
          <div className="bg-white border-2 border-sky-300 rounded-2xl p-8 shadow-lg">
            <h3 className="text-5xl font-bold text-green-500 mb-2">
              {taskComplete}
            </h3>
            <p className="text-sky-700 font-medium">Completadas</p>
          </div>

         
          <div className="bg-white border-2 border-sky-300 rounded-2xl p-8 shadow-lg">
            <h3 className="text-5xl font-bold text-amber-500 mb-2">
              {taskPending}
            </h3>
            <p className="text-sky-700 font-medium">Pendientes</p>
          </div>
        </div>


        <div className="text-center">
          <Link
            to="/task"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition shadow-lg shadow-green-500/30"
          >
            Ir a mis Tareas
          </Link>
        </div>
      </div>
    </main>
  );
};


