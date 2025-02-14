import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: localStorage.getItem('token'),
  },
});

export const geoisApi = axios.create({
  baseURL: import.meta.env.VITE_GEOIS_API_URL,
  auth: {
    username: import.meta.env.VITE_GEOIS_USERNAME,
    password: import.meta.env.VITE_GEOIS_PASSWORD,
  },
});
