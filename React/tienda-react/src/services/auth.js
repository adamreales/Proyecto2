import axios, { Axios, AxiosError } from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('sessionId', sessionId);
  }

  return sessionId;
};

export const login = async(email, password) => 
{
    const sessionId = getSessionId();

    const response = await axios.post(
      `${API_URL}login`,
      { email, password },
      {
        headers: {
          'X-Session-Id': sessionId,
        },
      }
    );
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