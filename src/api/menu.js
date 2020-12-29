/*jshint esversion: 6 */
//aqui se va a encargar de conectar el frontend con el back con cada función:
import { basePath, apiVersion } from "./config";

export function getMenuApi() {
  //creamos la url de conexión:
  const url = `${basePath}/${apiVersion}/get-menus`;

  //como es de tipo get, no hace falta crear parámetros

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

//función para actualizar la base de datos cuando se modifique el orden:
export function updateMenuApi(token, menuId, data) {
  //creamos la url donde se conecta al backend:
  const url = `${basePath}/${apiVersion}/update-menu/${menuId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err.message;
    });
}

//función para activar o desactivar los menús:
export function activateMenuApi(token, menuId, status) {
  const url = `${basePath}/${apiVersion}/activate-menu/${menuId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ active: status }),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err.message;
    });
}

//función para crear nuevos menús:
export function addMenuApi(token, menu) {
  const url = `${basePath}/${apiVersion}/add-menu`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(menu),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err.message;
    });
}

//función para eliminar menus (api)
export function deleteMenuApi(token, menuId) {
  const url = `${basePath}/${apiVersion}/delete-menu/${menuId}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err.message;
    });
}
