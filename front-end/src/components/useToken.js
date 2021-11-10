import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');

    try {
      const userToken = JSON.parse(tokenString);
      return userToken;
    } catch(e) {
      return false;
    }
  }
  
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  }

  const deleteToken = () => localStorage.removeItem('token') 

  return {
    token,
    deleteToken,
    setToken: saveToken,
  }
}

