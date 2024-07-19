/* eslint-disable no-undef */
import axios from 'axios';

import { baseURL, LOCALSTORAGE_AUTH_KEY } from '@/constants/defaultVariables';

const API = () => {
  const defaultOptions = {
    baseURL: baseURL,
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    (apiConfig) => {
      const token = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);

      if (token) {
        apiConfig.headers['Authorization'] = `Bearer ${token}`;
      }

      return apiConfig;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 401) {
        localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
        window.location.assign('/');
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export default API();
