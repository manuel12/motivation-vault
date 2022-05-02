import { useState } from "react";
import { API } from "../api-service";

export default function useToken() {
  const getToken = () => {
    const localStorageToken = localStorage.getItem("token");

    try {
      if(!localStorageToken) return localStorageToken;
      const userToken = JSON.parse(localStorageToken);
      return userToken;
    } catch (e) {
      return false;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = async (userToken) => {
    API.isValidToken(userToken, (validToken) => {
      let validatedToken = validToken ? userToken : false;
      localStorage.setItem("token", JSON.stringify(validatedToken));
      setToken(validatedToken);
    });
  };

  const deleteToken = () => localStorage.removeItem("token");

  return {
    token,
    deleteToken,
    setToken: saveToken,
  };
}
