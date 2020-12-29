import { basePath, apiVersion } from "./config";

//función para obtener todos los cursos
export function getCoursesApi() {
  const url = `${basePath}/${apiVersion}/get-courses`;

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

//function para obtener todos los cursos
export function getCourseDataUdemyApi(id) {
  //creamos la url a donde se va a a hacer la petición de la info:
  //https://www.udemy.com/developers/affiliate/
  const baseUrl = `https://www.udemy.com/api-2.0/courses/${id}`;

  // Creamos los parámetros de búsqueda de la api:
  //de la docuemntación de udemy:
  const courseParams = `?fields[course]=title,headline,url,price,image_480x270`;

  //concatenamos url:
  const url = baseUrl + courseParams;

  //hacemos la conexión:
  return fetch(url)
    .then(async (response) => {
      return { code: response.status, data: await response.json() };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

//función para eliminar cursos:
export function deleteCoursesApi(token, id) {
  // creamos la url de conexión:
  const url = `${basePath}/${apiVersion}/delete-course/${id}`;

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
      return err;
    });
}

//función para agregar cursos:
export function addCoursesApi(token, course) {
  //creamos la url de conexión:
  const url = `${basePath}/${apiVersion}/add-course`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(course),
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

//función para actualizar cursos:
export function updateCoursesApi(token, id, data) {
  // creamos la url a donde se va a conectar la api:
  const url = `${basePath}/${apiVersion}/update-course/${id}`;

  // creamos los parámetros:
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
      return result;
    })
    .catch((err) => {
      return err;
    });
}
