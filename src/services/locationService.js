import api from "./api";

export const getLocations = () =>
  api.get("/locations");

export const createLocation = (data) =>
  api.post("/locations", data);