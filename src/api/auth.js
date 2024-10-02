import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

// Automatically set Authorization header if token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Error normalization function
const getErrorMessage = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  return 'An unexpected error occurred';
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    console.error('Get user profile error:', getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
};
