/*jshint esversion: 6 */
//aqui vamos a gestionar las importaciones:

import { basePath, apiVersion } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
const jwtDecode = require("jwt-decode");

//function para Crear AccessToken
export function getAccessTokenApi() {
  //1. recogemos el accssToken del localStorage:
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  //2. Validamos si hay token: (!accessToken es decir: false), o si no hay: null:
  if (!accessToken || accessToken === "null") {
    return null;
  } else {
    //esta función regresa true or false
    return expirationToken(accessToken) ? null : accessToken;
  }
}

//function para getRefreshToken:
export function getRefreshTokenApi() {
  //1. recogemos el RefreshToken del localStorage:
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  //2. Validamos si hay token: (!refreshsToken es decir: false), o si no hay: null:
  if (!refreshToken || refreshToken === "null") {
    return null;
  } else {
    return expirationToken(refreshToken) ? null : refreshToken;
  }
}

//una nueva function para refrescar el token:
export function refreshAccessTokenApi(refreshToken) {
  const url = `${basePath}/${apiVersion}/refresh-access-token`;
  const bodyObj = {
    refreshToken: refreshToken,
  };

  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application/json",
    },
  };
  //clase 83, minuto 4:00
  fetch(url, params)
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response.json();
    })
    .then((result) => {
      if (!result) {
        logout();
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    });
}

//function para Desloggear al usuario:
export function logout() {
  //vamos a quitar los tokens.
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

//función para validar si ha expirado o no:
function expirationToken(token) {
  const seconds = 60;
  //para decodificar el token:
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;
  //regresa: si now es mayor a true = true (es vigente), si no regresa false: ha expirado
  return now > exp;
}
