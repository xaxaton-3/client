import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

api.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem('token');
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (err) => Promise.reject(err),
);

export const geoisApi = axios.create({
  baseURL: import.meta.env.VITE_GEOIS_API_URL,
  auth: {
    username: import.meta.env.VITE_GEOIS_USERNAME,
    password: import.meta.env.VITE_GEOIS_PASSWORD,
  },
});
