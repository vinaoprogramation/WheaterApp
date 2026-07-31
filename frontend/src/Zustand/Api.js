import axios from 'axios';
import { authStorage } from './ArmazenamentoToken/AuthStorage';
import BASE_URL from './UrlBase';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await authStorage.getToken();

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;