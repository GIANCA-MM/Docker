import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-zinc-900 text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full text-center space-y-8 bg-zinc-800/50 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-zinc-700/60 shadow-2xl transition-all duration-300 hover:border-indigo-500/40">
        <div className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-sm font-medium animate-pulse">
          Gestor de Notas & Tareas
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-indigo-400 bg-clip-text text-transparent">
          Organiza tus proyectos de forma rápida e intuitiva
        </h1>
        <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Una aplicación moderna creada con React, Vite y Tailwind CSS para gestionar tus notas diarias, mantener el control de tus actividades e incrementar tu productividad.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 active:scale-95 transition-all duration-200"
          >
            Comenzar Gratis
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-3.5 bg-zinc-700/70 hover:bg-zinc-700 text-zinc-200 font-semibold rounded-xl border border-zinc-600 active:scale-95 transition-all duration-200"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
