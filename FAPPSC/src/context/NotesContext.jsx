import { createContext, useContext, useState } from "react";
import {
  createNotesRequest,
  getNotesRequest,
  deleteNotesRequest,
  getNoteRequest,
  updateNotesRequest,
} from "../api/notes";

const NoteContext = createContext();

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [param, setParam] = useState(null);

  const getNotes = async () => {
    try {
      const res = await getNotesRequest();
      console.log("Antes de setNotes: ", notes);
      console.log("Datos recibidos: ", res.data);
      setNotes(res.data);
    } catch (error) {
      console.error("Error al obtener notas:", error);
    }
  };

  const createNotes = async (note) => {
    try {
      const res = await createNotesRequest(note);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteNote = async (id) => {
    try {
      const res = await deleteNotesRequest(id);
      if (res.status == 204) setNotes(notes.filter((note) => note._id != id));
    } catch (error) {
      console.log(error);
    }
  };

  const getNote = async (id) => {
    try {
      const res = await getNoteRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateNote = async (id, note) => {
    try {
      const res = await updateNotesRequest(id, note);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <NoteContext.Provider
      value={{
        notes,
        getNotes,
        createNotes,
        deleteNote,
        getNote,
        updateNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
