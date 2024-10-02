import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
      const { token, ...userData } = response.data;
      setUser(userData);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Sign in error:', error);
      throw new Error(error.response?.data?.message || 'Failed to sign in');
    }
  };

  const signUp = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, userData);
      const { token, ...newUserData } = response.data;
      setUser(newUserData);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Sign up error:', error);
      throw new Error(error.response?.data?.message || 'Failed to sign up');
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  const value = {
    user,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};