/*jshint esversion: 6 */
import { basePath, apiVersion } from "./config";

//función para obtener todos los posts:
export function getPostsApi(limit, page) {
  //creamos la url con los parametros que le vamos a mandar, desde la función que la llamemos:
  const url = `${basePath}/${apiVersion}/get-posts?limit=${limit}&page=${page}`;

  //ahora hacemos la conexión:

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

//función para eliminar posts:
export function deletePostsApi(token, id) {
  //creamos la url de conexión:
  const url = `${basePath}/${apiVersion}/delete-posts/${id}`;

  //creamos los parámetros:
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
      return result;
    })
    .catch((err) => {
      return err;
    });
}

//función para agregar posts:
export function addPostApi(token, post) {
  // creamos la url para conectarse al backend:
  const url = `${basePath}/${apiVersion}/add-post`;

  //creamos los parámetros:
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

//función para actualizar el post:
export function updatePostApi(token, id, post) {
  // creamos la url para conectarse al backend:
  const url = `${basePath}/${apiVersion}/update-posts/${id}`;

  // creamos los params:
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

//función para traer un elemento en específico:
export function getPostApi(urlPost) {
  const url = `${basePath}/${apiVersion}/get-post/${urlPost}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
