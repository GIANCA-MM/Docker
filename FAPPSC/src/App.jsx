import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NoteProvider } from "./context/NotesContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { NotesPage } from "./pages/NotesPages";
import NotesFormPage from "./pages/NotesFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";

import ProtectedRoute from "./ProtectedRoute";
import Navbar1 from "./components/Navbar1";
import Navbar2 from "./components/Navbar2";

function App() {
  return (
    <AuthProvider>
      <NoteProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <MainLayout />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/add-note" element={<NotesFormPage />} />
                <Route path="/notes/:id" element={<NotesFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </NoteProvider>
    </AuthProvider>
  );
}

function MainLayout() {
  const { user } = useAuth(); // Verificamos si el usuario está autenticado
  const location = useLocation();

  // No mostrar Navbar en la pantalla de login y register
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return user ? <Navbar2 /> : <Navbar1 />;
}

export default App;
