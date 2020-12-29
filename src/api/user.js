/*jshint esversion: 6 */
import { basePath, apiVersion } from "./config";

//exportamos la función que va a conectar con nuestro API en RegisterForm: (data viene de function register(), es inputs)
export function signUpApi(data) {
  // creamos la url para signUp: http://localhost:3077/api/v1/sign-up
  const url = `${basePath}/${apiVersion}/sign-up`;

  //creamos el body requerido:
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  //revisar documentación de fetch:
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      //para que devuelva un error cuando el usuario ya exista:
      if (result.user) {
        return {
          // vamos a regresar un objeto
          ok: true,
          message: "Usuario creado satisfactoriamente",
        };
      } else {
        return {
          //vamos a regresar un objeto

          ok: false,
          message: result.message,
        };
        //result.message es el mensaje que mandamos del backend/controllers/user.js
      }
    })
    .catch((err) => {
      return {
        //   vamos a regresar un objeto

        ok: false,
        message: err.message,
      };
    });
}

//exportamos la función que va a conectar con nuestro API en LoginForm: (data viene de function login(), es inputs)
export function signInApi(data) {
  const url = `${basePath}/${apiVersion}/sign-in`;

  //creamos los parametros:
  const params = {
    method: "POST",
    //vamos a convertir los datos a un objeto JSON:
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  //regresamos el fetch:
  return fetch(url, params)
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

//exportamos la función para ver la base de datos de usuarios.
//solo los usuarios loggeados pueden verla, por eso mandamos un token:
export function getUsersApi(token) {
  //creamos la url para request:
  const url = `${basePath}/${apiVersion}/users`;

  const params = {
    method: "GET",
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
      return err.message;
    });
}

//para los usuarios activos:
export function getUsersActiveApi(token, status) {
  //status es si es activo o inactivo

  //cambiamos la url del endpoint, con el query de búsqueda/condicionante:
  const url = `${basePath}/${apiVersion}/users-active?active=${status}`;

  const params = {
    method: "GET",
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
      return err.message;
    });
}

//para actualizar Avatar:
export function uploadAvatarApi(token, avatar, userId) {
  const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;

  const formData = new FormData();
  formData.append("avatar", avatar, avatar.name);

  const params = {
    method: "PUT",
    body: formData,
    headers: {
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
      return err.message;
    });
}

//para obtener el avatar:
export function getAvatarApi(avatarName) {
  //creamos la URL:
  const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;

  return fetch(url)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
}

//para actualizar los datos del usuario:
export function updateUserApi(token, user, userId) {
  //creamos el url:
  //api.put("/update-user/:id", [md_auth.ensureAuth], UserController.updateUser);
  const url = `${basePath}/${apiVersion}/update-user/${userId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(user),
  };

  return fetch(url, params)
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

//función para activar y desactivar usuarios:
export function activateUserApi(token, userId, status) {
  //va a recibir el token pq se requiere autentificación, el userID del que se va a modificar y el status a modificar
  //creamos la URL de toque al endpoint:
  const url = `${basePath}/${apiVersion}/activate-user/${userId}`;

  const params = {
    method: "PUT",
    //put pq vamos a hacer update
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      //son los headers que mandamos con POSTMAN
    },
    body: JSON.stringify({
      //tenemos que convertir a objeto el booleano de status
      active: status,
    }),
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

//función para borrar usuarios
export function deleteUserApi(token, userId) {
  //generamos la ruta de conexión con el endpoint:
  const url = `${basePath}/${apiVersion}/delete-user/${userId}`;

  //creamos los parámetros de conexión:
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

//función para crear nuevos usuarios desde Admin Panel
export function signUpAdminApi(token, data) {
  const url = `${basePath}/${apiVersion}/sign-up-admin`;

  const params = {
    method: "POST",
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
