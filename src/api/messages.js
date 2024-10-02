import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchMessages = async (userId) => {
  const response = await axios.get(`${API_URL}/messages`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
};

export const sendMessage = async ({ userId, content }) => {
  const response = await axios.post(`${API_URL}/messages`, 
    { content },
    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
  );
  return response.data;
};