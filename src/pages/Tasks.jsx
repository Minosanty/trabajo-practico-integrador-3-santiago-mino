import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { useForm } from "../hooks/useForm";




export const Tasks = () => {
  // Estados de la lista de tareas
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hook del formulario, nos da setValues para rellenarlo
  const { user, setUser, handleChange, handleReset } = useForm({
    title: "",
    description: "",
    is_completed: false, // Valor inicial del checkbox
  });

  // Estado para saber si estamos creando o editando
  const [idToEdit, setIdToEdit] = useState(null);

  const fetchTasks = async () => {
    // Solo mostramos el loading la primera vez
    if (tasks.length === 0) {
      setLoading(true);
    }

    try {
      const res = await fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        // Aseguramos que tasks sea siempre un array
        setTasks(data.tasks || (Array.isArray(data) ? data : []));
      } else {
        console.error("Error al obtener las tareas");
        setTasks([]);
      }
    } catch (error) {
      console.error(error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Funcion para manejar el envios
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si "idToEdit" tiene un ID, llamamos a la funcion para actualizar
    // Si es "null", llamamos a la funcion para crear una tarea
    if (idToEdit) {
      handleUpdateTask();
    } else {
      handleCreateTask();
    }
  };

  // Funcion que se llama al presionar Editar en una tarea
  const handleSelectEdit = (task) => {
    // Ponemos el ID de la tarea seleccionada en el estado "idToEdit"
    setIdToEdit(task.id);
    // Usamos "setValues" del useForm para rellenar el formulario con los valores que continen
    setUser({
      title: task.title,
      description: task.description,
      is_completed: task.is_completed,
    });
  };

  // Funcion para Cancelar operacion
  const handleCancelEdit = () => {
    setIdToEdit(null); // Salimos del modo Editar
    handleReset(); // Vaciamos el formulario
  };

  // Funcion para Crear
  const handleCreateTask = async () => {
    if (!user.title) {
      alert("El título es obligatorio");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user),
      });
      if (res.ok) {
        alert("¡Tarea creada exitosamente!");
        handleReset();
        fetchTasks();
      } else {
        const data = await res.json();
        alert(data.message || "Error al crear la tarea");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al crear la tarea");
    }
  };

  // Funcion para Actualizar
  const handleUpdateTask = async () => {
    if (!values.title) {
      alert("El título es obligatorio");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${idToEdit}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user),
      });

      if (res.ok) {
        alert("¡Tarea actualizada exitosamente!");
        handleCancelEdit(); // Limpia el formulario y sale del modo Editar
        fetchTasks();
      } else {
        const data = await res.json();
        alert(data.message || "Error al actualizar la tarea");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al actualizar la tarea");
    }
  };

  // Funcion para Borrar
  const handleDelete = async (taskId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        alert("Tarea eliminada exitosamente");
        fetchTasks();
      } else {
        const data = await res.json();
        alert(data.message || "Error al eliminar la tarea");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al eliminar la tarea");
    }
  };

  return (
    <main className="min-h-screen bg-sky-50 text-sky-900 px-6 py-16">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Formulario para crear y editar */}
        <section className="md:col-span-1">
          {/* cambia si estamos editando o creando */}
          <h2 className="text-2xl font-semibold mb-4 text-sky-900">
            {idToEdit ? "Editar" : "Crear"}{" "}
            <span className="text-green-600">Tarea</span>
          </h2>

          <form
            onSubmit={handleSubmit} // Llama a la función principal
            className="bg-sky-100 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-sky-300 space-y-4"
          >
            {/* Titulo */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-sky-700 mb-1"
              >
                Título
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={user.title}
                onChange={handleChange}
                placeholder="Ej: Comprar leche"
                className="w-full px-4 py-2.5 rounded-lg bg-white border-2 border-sky-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sky-900"
              />
            </div>

            {/* Descripcion */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-sky-700 mb-1"
              >
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={user.description}
                onChange={handleChange}
                rows="3"
                placeholder="Detalles de la tarea..."
                className="w-full px-4 py-2.5 rounded-lg bg-white border-2 border-sky-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sky-900"
              ></textarea>
            </div>

            {/* Checkbox Completada */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_completed"
                name="is_completed"
                checked={user.is_completed}
                onChange={handleChange}
                className="h-4 w-4 rounded bg-sky-200 border-sky-400 text-green-600 focus:ring-green-500"
              />
              <label htmlFor="is_completed" className="text-sm text-sky-700">
                Marcar como completada
              </label>
            </div>

            {/* Boton para guardar tarea */}
            <button
              type="submit"
              className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition shadow-lg shadow-green-500/20"
            >
              {idToEdit ? "Actualizar Tarea" : "Guardar Tarea"}
            </button>

            {/* Botón de Cancelar (solo aparece si estamos editando) */}
            {idToEdit && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full py-2.5 bg-sky-400 hover:bg-sky-500 text-white rounded-lg font-medium transition"
              >
                Cancelar Edición
              </button>
            )}
          </form>
        </section>

        {/* Lista de Tareas*/}
        <section className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 text-sky-900">
            Mis <span className="text-green-600">Tareas</span>
          </h2>

          <div className="bg-sky-100 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-sky-300 relative min-h-[200px]">
            {loading && <Loading />}

            {!loading && (
              <>
                {tasks.length === 0 ? (
                  // Mensaje si no hay tareas
                  <p className="text-center text-sky-600 pt-10">
                    Aún no tienes tareas. ¡Añade una!
                  </p>
                ) : (
                  // Lista de tareas (.map)
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-white border border-sky-300 p-4 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <h3
                            className={`text-lg font-medium ${
                              task.is_completed
                                ? "text-sky-400 line-through"
                                : "text-sky-900"
                            }`}
                          >
                            {task.title}
                          </h3>
                          <p
                            className={`text-sm ${
                              task.is_completed
                                ? "text-sky-400 line-through"
                                : "text-sky-600"
                            }`}
                          >
                            {task.description}
                          </p>
                        </div>
                        {/* Botones de Accion (Por fin funcionando los dos) */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSelectEdit(task)}
                            className="text-sm bg-amber-500 hover:bg-amber-600 px-3 py-1 rounded text-white"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
                          >
                            Borrar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};


