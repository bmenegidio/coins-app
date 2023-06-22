import { API_BASE_URL } from '@env';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export { axiosInstance as apiInstance };
