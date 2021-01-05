/*jshint esversion: 6 */
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
//importamos la función para obtener el Token del usuario para mandarlo a la petición:
import { getAccessTokenApi } from "../../../api/auth";
//importamos el API:
import { getUsersActiveApi } from "../../../api/user";
//importamos el componente de las listas de usuarios:
import ListUsers from "../../../components/Admin_components/Users/ListUsers/";

import "./Users.scss";

export default function Users() {
  //creamos un nuevo estado para guardar el usuario: (inicia con array vacio)
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);

  // guardamos el token:
  const token = getAccessTokenApi();

  //esto es para mostrar los usuarios constantemente después de la llamada:
  useEffect(() => {
    getUsersActiveApi(token, true).then((response) => {
      setUsersActive(response.users);
    });
    getUsersActiveApi(token, false).then((response) => {
      setUsersInactive(response.users);
    });
    setReloadUsers(false);
  }, [token, reloadUsers]);

  return (
    <>
      <Helmet>
        <title>Usuarios | Admin</title>
        <meta
          name='description'
          content='Dtech Academy, desarrolla tus habilidades tecnológicas'
          data-react-helmet='true'
        />
      </Helmet>
      <div className='users'>
        <ListUsers
          usersActive={usersActive}
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
        />
      </div>
    </>
  );
}
