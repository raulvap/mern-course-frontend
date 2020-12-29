/*jshint esversion: 6 */
import { basePath, apiVersion } from "./config";

export function subscribeNewsletterApi(email) {
  //creamos la url a donde se va a conectar el front con el back:
  const url = `${basePath}/${apiVersion}//subscribe-newsletter/${email.toLowerCase()}`;

  //   Creamos los parámetros que le vamos a mandar:
  const params = {
    method: "POST",
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
