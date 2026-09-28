import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

function Navbar2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-zinc-900/90 border-b border-zinc-800 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          {/* Botón menú móvil */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Abrir menú principal</span>
              {menuOpen ? (
                <svg className="size-6" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="size-6" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18m-18 6h18" />
                </svg>
              )}
            </button>
          </div>

          {/* Logo y Enlaces */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/notes" className="flex shrink-0 items-center gap-2">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Logo"
              />
              <span className="font-bold text-lg text-white tracking-wide hidden sm:inline">
                TaskManager
              </span>
            </Link>

            <div className="hidden sm:ml-8 sm:block">
              <div className="flex space-x-2">
                <Link
                  to="/notes"
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive("/notes")
                      ? "bg-zinc-800 text-white font-semibold"
                      : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
                  }`}
                >
                  Notas
                </Link>
                <Link
                  to="/add-note"
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive("/add-note")
                      ? "bg-zinc-800 text-white font-semibold"
                      : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
                  }`}
                >
                  + Crear Nota
                </Link>
              </div>
            </div>
          </div>

          {/* Info del usuario y Menú Perfil */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block text-sm font-medium text-zinc-300 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">
              {user?.username || "Usuario"}
            </span>

            <div className="relative ml-2">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="relative flex rounded-full bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-zinc-800 py-1 shadow-2xl border border-zinc-700">
                  <div className="px-4 py-2 border-b border-zinc-700/60 md:hidden">
                    <p className="text-xs text-zinc-400">Conectado como</p>
                    <p className="text-sm font-semibold text-white truncate">{user?.username}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700/60 transition"
                  >
                    Tu Perfil
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {menuOpen && (
        <div className="sm:hidden border-t border-zinc-800 bg-zinc-900 px-4 pt-2 pb-4 space-y-1" id="mobile-menu">
          <Link
            to="/notes"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-white hover:bg-zinc-800"
          >
            Notas
          </Link>
          <Link
            to="/add-note"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Crear Nota
          </Link>
          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Perfil
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              logout();
            }}
            className="block w-full text-left rounded-lg px-3 py-2 text-base font-medium text-red-400 hover:bg-red-500/10"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar2;
