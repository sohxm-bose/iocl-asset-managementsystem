import api from "./api";

export const getTickets = () =>
  api.get("/tickets");

export const createTicket = (data) =>
  api.post("/tickets", data);