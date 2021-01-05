import React from "react";
import { Helmet } from "react-helmet";

import AdminHome from "../../components/Admin_components/AdminHome";

function Admin() {
  return (
    <>
      <Helmet>
        <title>Admin | DTech Academy</title>
        <meta
          name='description'
          content='Dtech Academy, desarrolla tus habilidades tecnológicas'
          data-react-helmet='true'
        />
      </Helmet>
      <AdminHome />
    </>
  );
}

export default Admin;
