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

export const cambiarContraseña = async (password_actual, password_nueva, password_confirmacion) => {
  const token = localStorage.getItem('token');
  
  const response = await axios.post(
    `${API_URL}cambiar_contraseña`,
    {
      password_actual,
      password_nueva,
      password_confirmacion
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const solicitar_recuperacion = async (email) => {
  const response = await axios.post(
    `${API_URL}solicitar_recuperacion_contraseña`,
    { email }
  );

  return response.data;
};

export const resetear_contraseña = async (email, token, password, password_confirmation) => {
  const response = await axios.post(
    `${API_URL}validar_y_reset_contraseña`,
    {
      email,
      token,
      password,
      password_confirmation
    }
  );

  return response.data;
};