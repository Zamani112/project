import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchPrescriptions = async (userId) => {
  const response = await axios.get(`${API_URL}/prescriptions`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const addPrescription = async (prescriptionData) => {
  const response = await axios.post(`${API_URL}/prescriptions`, prescriptionData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};