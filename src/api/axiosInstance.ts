import axios from 'axios';

export const API_URL = 'http://18.193.158.51:8000';

export const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
