import axios from 'axios';

export const API_URL = 'http://localhost:8000';

export const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
