/*jshint esversion: 6 */
import React, { useState, useEffect, createContext } from "react";
import jwtDecode from "jwt-decode";
import {
  getAccessTokenApi,
  getRefreshTokenApi,
  refreshAccessTokenApi,
  logout,
} from "../api/auth";

//creamos una const a exportar:
export const AuthContext = createContext();

//creamos la function:
export default function AuthProvider(props) {
  //los props vienen de SRC/App.js (son el hijo), deconstructing:
  const { children } = props;
  //creando un estado que esté verificando constantemente si está loggeado:
  const [user, setUser] = useState({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    checkUserLogin(setUser);
  }, []);

  //vamos a regresar el compomente, con children.
  //De props va a tener el usuario de componente de estado
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

//function para revisar si está loggeado
function checkUserLogin(setUser) {
  const accessToken = getAccessTokenApi();

  if (!accessToken) {
    //si es inválido o null, ha caducado o algo:
    const refreshToken = getRefreshTokenApi();

    if (!refreshToken) {
      //si es nulo a caducado, debe quitar los tokens:
      logout();
      setUser({
        user: null,
        isLoading: false,
      });
    } else {
      refreshAccessTokenApi(refreshToken);
    }
  } else {
    //si el token si es válido entonces:
    setUser({
      isLoading: false,
      user: jwtDecode(accessToken),
    });
  }
}
