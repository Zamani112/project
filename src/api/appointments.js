import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchAppointments = async () => {
  const response = await axios.get(`${API_URL}/appointments`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const createAppointment = async (appointmentData) => {
  const response = await axios.post(`${API_URL}/appointments`, appointmentData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const updateAppointment = async (id, updateData) => {
  const response = await axios.put(`${API_URL}/appointments/${id}`, updateData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await axios.delete(`${API_URL}/appointments/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};