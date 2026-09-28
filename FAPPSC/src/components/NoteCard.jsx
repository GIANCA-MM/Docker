import { useNotes } from "../context/NotesContext";
import { Link } from "react-router-dom";

function NoteCard({ note }) {
  const { deleteNote } = useNotes();

  // Formateo simple de fecha si está disponible
  const formattedDate = note.date
    ? new Date(note.date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : note.createdAt
    ? new Date(note.createdAt).toLocaleDateString("es-ES")
    : null;

  return (
    <div className="bg-zinc-800/90 border border-zinc-700/80 hover:border-zinc-600 transition-all duration-300 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col justify-between group">
      <div>
        <header className="flex justify-between items-start gap-3 mb-3">
          <h1 className="text-xl font-bold text-white tracking-tight line-clamp-2 group-hover:text-indigo-300 transition-colors">
            {note.title}
          </h1>
          <div className="flex items-center gap-1.5 shrink-0">
            <Link
              to={`/notes/${note._id}`}
              className="px-2.5 py-1 text-xs font-medium bg-zinc-700 hover:bg-indigo-600 text-zinc-300 hover:text-white rounded-lg transition-colors"
              title="Editar nota"
            >
              Editar
            </Link>
            <button
              onClick={() => deleteNote(note._id)}
              className="px-2.5 py-1 text-xs font-medium bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 hover:border-transparent rounded-lg transition-all"
              title="Eliminar nota"
            >
              Eliminar
            </button>
          </div>
        </header>

        <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line break-words">
          {note.description}
        </p>
      </div>

      <footer className="mt-6 pt-3 border-t border-zinc-700/50 flex items-center justify-between text-xs text-zinc-400">
        <span className="flex items-center gap-1">
          <span>📅</span> {formattedDate || "Sin fecha"}
        </span>
      </footer>
    </div>
  );
}

export default NoteCard;
