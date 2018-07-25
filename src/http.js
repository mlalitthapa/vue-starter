import Api from '@/config/api';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: Api.BASE_URL,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

export default axiosInstance;
