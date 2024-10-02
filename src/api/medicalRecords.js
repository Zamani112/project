import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchMedicalRecords = async (userId) => {
  const response = await axios.get(`${API_URL}/medical-records`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const addMedicalRecord = async (recordData) => {
  const response = await axios.post(`${API_URL}/medical-records`, recordData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};