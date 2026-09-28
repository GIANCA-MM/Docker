import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/notes");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-zinc-900 px-4 py-8">
      <div className="bg-zinc-800/90 border border-zinc-700/80 shadow-2xl rounded-2xl p-8 max-w-md w-full backdrop-blur-sm transition-all duration-300">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">Crear Cuenta</h1>
          <p className="text-zinc-400 text-sm mt-1">Completa el formulario para registrarte</p>
        </div>

        {registerErrors.map((error, i) => (
          <div
            className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-4 text-center font-medium"
            key={i}
          >
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Nombre de Usuario
            </label>
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full bg-zinc-700/50 border border-zinc-600 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition placeholder-zinc-400"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-400 text-xs mt-1 font-medium">El nombre de usuario es requerido</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700/50 border border-zinc-600 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition placeholder-zinc-400"
              placeholder="tu@correo.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 font-medium">El correo es requerido</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full bg-zinc-700/50 border border-zinc-600 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition placeholder-zinc-400"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1 font-medium">La contraseña es requerida</p>
            )}
          </div>

          <button
            className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] transition-all duration-200 font-semibold py-2.5 px-4 rounded-lg shadow-lg shadow-emerald-600/30 text-white mt-2"
            type="submit"
          >
            Registrarse
          </button>
        </form>

        <p className="flex gap-x-2 justify-between text-sm text-zinc-400 mt-6 pt-4 border-t border-zinc-700/60">
          <span>¿Ya tienes una cuenta?</span>
          <Link to="/login" className="text-sky-400 hover:text-sky-300 font-medium transition">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
