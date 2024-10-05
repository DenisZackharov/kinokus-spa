import axios from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST || '';

const axiosInstance = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
