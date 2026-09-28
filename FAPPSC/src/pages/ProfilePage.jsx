import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-zinc-900 flex items-center justify-center px-4 py-8">
      <div className="bg-zinc-800/90 border border-zinc-700/80 shadow-2xl rounded-2xl p-8 max-w-md w-full text-center backdrop-blur-sm space-y-6">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto">
            {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
          </div>
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-zinc-800 rounded-full"></span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {user?.username || "Usuario"}
          </h1>
          <p className="text-zinc-400 text-sm mt-1">{user?.email || "correo@ejemplo.com"}</p>
        </div>

        <div className="bg-zinc-700/40 border border-zinc-700 rounded-xl p-4 text-left space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-400">ID de Usuario:</span>
            <span className="text-zinc-200 font-mono text-xs bg-zinc-800 px-2 py-1 rounded">
              {user?.id || user?._id || "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-400">Estado:</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Activo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
