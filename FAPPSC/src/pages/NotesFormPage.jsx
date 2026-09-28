import { useForm } from "react-hook-form";
import { useNotes } from "../context/NotesContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function NotesFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createNotes, getNote, updateNote } = useNotes();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadNote() {
      if (params.id) {
        const note = await getNote(params.id);
        setValue("title", note.title);
        setValue("description", note.description);
      }
    }
    loadNote();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateNote(params.id, data);
    } else {
      createNotes(data);
    }
    navigate("/notes");
  });

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-zinc-900 px-4 py-8">
      <div className="bg-zinc-800/90 border border-zinc-700/80 shadow-2xl rounded-2xl p-8 max-w-md w-full backdrop-blur-sm transition-all duration-300">
        <h1 className="text-2xl font-bold text-white mb-6 text-center tracking-tight">
          {params.id ? "Editar Nota" : "Crear Nueva Nota"}
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Título
            </label>
            <input
              type="text"
              className="w-full bg-zinc-700/50 border border-zinc-600 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition placeholder-zinc-400"
              placeholder="Título de la nota"
              {...register("title", { required: true })}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Descripción
            </label>
            <textarea
              rows="4"
              className="w-full bg-zinc-700/50 border border-zinc-600 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition placeholder-zinc-400 resize-none"
              placeholder="Escribe el contenido de la nota..."
              {...register("description", { required: true })}
            ></textarea>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/notes")}
              className="w-1/2 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 font-medium py-2.5 px-4 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-1/2 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all duration-200 font-semibold py-2.5 px-4 rounded-lg shadow-lg shadow-indigo-600/30 text-white"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NotesFormPage;
