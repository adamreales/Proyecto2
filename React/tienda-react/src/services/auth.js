import axios, { Axios, AxiosError } from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export const login = async(email, password) => 
{
    const response = await axios.post(`${API_URL}login`, { email, password });
    return response.data;
};

export const register = async (name,email, password,conf_password) => {
  const response = await axios.post(`${API_URL}registro`, {
    name,
    email,
    password,
    conf_password,
  });

  return response.data;
};