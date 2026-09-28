import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar1() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-zinc-900/90 border-b border-zinc-800 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          {/* Botón del menú móvil */}
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

          {/* Logo y Enlaces Principales */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/" className="flex shrink-0 items-center gap-2">
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
                  to="/"
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive("/")
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
                  }`}
                >
                  Inicio
                </Link>
                <Link
                  to="/about"
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive("/about")
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
                  }`}
                >
                  Acerca de
                </Link>
              </div>
            </div>
          </div>

          {/* Menú Usuario / Acceso */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/login"
              className="text-zinc-300 hover:text-white text-sm font-medium px-3 py-2 rounded-lg transition"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md shadow-indigo-600/20 active:scale-95 transition"
            >
              Registrarse
            </Link>
          </div>

          {/* Dropdown Móvil / Alternativo */}
          <div className="relative ml-3 sm:hidden">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex rounded-full bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              <span className="sr-only">Menú de acceso</span>
              <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-300">
                👤
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-zinc-800 py-1 shadow-2xl border border-zinc-700">
                <Link
                  to="/login"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700/60 transition"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-indigo-400 font-medium hover:bg-zinc-700/60 transition"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {menuOpen && (
        <div className="sm:hidden border-t border-zinc-800 bg-zinc-900 px-4 pt-2 pb-4 space-y-1" id="mobile-menu">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-white hover:bg-zinc-800"
          >
            Inicio
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Acerca de
          </Link>
          <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-800"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center px-3 py-2 rounded-lg bg-indigo-600 text-white font-medium"
            >
              Registrarse
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar1;
