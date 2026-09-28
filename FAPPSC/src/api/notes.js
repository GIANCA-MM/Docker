import axios from "./axios.js";

export const getNotesRequest = () => axios.get("/getNotes");
export const getNoteRequest = (id) => axios.get(`/getNote/${id}`);
export const createNotesRequest = (note) => axios.post("/getNote", note);
export const updateNotesRequest = (id, note) =>
  axios.put(`/getNote/${id}`, note);
export const deleteNotesRequest = (id) => axios.delete(`/getNote/${id}`);
//commit
