import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TokenComponent = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await axios.post('https://dev-abbytech.us.auth0.com/oauth/token', {
          client_id: 'zq5uEJy4wHzwndmY6qR8A96VnofYylC6',
          username: 'jhojairamarquez.99@gmail.com',
          password: 'Jh080899',
          grant_type: 'password',
          scope: 'openid'
        });

        const token = response.data.access_token;

        // Almacena el token en el estado del componente
        setToken(token);
      } catch (error) {
        console.error('Error al obtener el token:', error);
      }
    };

    // Llama a la función para obtener el token al cargar el componente
    getToken();
  }, []); // El segundo argumento vacío [] indica que se ejecuta solo una vez al montar el componente

  return (
    <div>
      <h1>Token: {token}</h1>
      {/* Aquí puedes utilizar el token en otras partes de tu componente */}
    </div>
  );
};

export default TokenComponent;
