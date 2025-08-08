// src/utils/axios.js
import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Replace with your backend base URL
  withCredentials: true, // Necessary for sending cookies/session with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosAPI;
