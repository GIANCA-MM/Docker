import { useEffect } from "react";
import { useNotes } from "../context/NotesContext";
import NoteCard from "../components/NoteCard";
import { Link } from "react-router-dom";

export function NotesPage() {
  const { notes, getNotes } = useNotes();

  useEffect(() => {
    getNotes(); // ✅ Se ejecuta al cargar la página
  }, []);

  useEffect(() => {
    console.log("Notas actualizadas:", notes);
  }, [notes]); // ✅ Se ejecuta cuando `notes` cambia

  if (!notes || notes.length === 0) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-zinc-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-zinc-800/80 border border-zinc-700/70 rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-4">
          <div className="w-16 h-16 bg-zinc-700/50 text-indigo-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            📝
          </div>
          <h1 className="text-2xl font-bold text-white">No hay tareas o notas</h1>
          <p className="text-zinc-400 text-sm">
            Aún no has creado ninguna nota. ¡Comienza agregando tu primera tarea!
          </p>
          <Link
            to="/add-note"
            className="inline-block px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-md shadow-indigo-600/30 transition active:scale-95"
          >
            Crear Nota
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-zinc-900 px-4 py-8 md:px-12">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Mis Notas</h1>
            <p className="text-zinc-400 text-sm">Gestiona y revisa tus tareas pendientes</p>
          </div>
          <Link
            to="/add-note"
            className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-lg shadow-md shadow-indigo-600/20 transition active:scale-95"
          >
            + Nueva Nota
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {notes.map((note) => (
            <NoteCard note={note} key={note._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
