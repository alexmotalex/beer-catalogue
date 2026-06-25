import axios from 'axios';

export const API_URL = 'https://craft-beer-catalogue-api.onrender.com';

export const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
