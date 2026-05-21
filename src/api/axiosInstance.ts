import axios from "axios";

export const API_URL = "https://tragedy-sacred-oboe.ngrok-free.dev";

export const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
