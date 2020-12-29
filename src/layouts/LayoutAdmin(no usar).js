/*jshint esversion: 6 */
// import React, { useState, Fragment } from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from "react-router-dom";
import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
//esto va a importar un layout desde Ant Design:
import { Layout } from "antd";

//importamos los hooks:
import useAuth from "../hooks/useAuth";

//Importamos Componentes:
import MenuTop from "../components/Admin_components/MenuTop/";
import MenuSider from "../components/Admin_components/MenuSider/";
import AdminSignIn from "../pages/Admin/SignIn/";

//importamos un fichero se SASS (.scss)
import "./LayoutAdmin.scss";

//importamos funcion para recibir token:
// import { getAccessTokenApi, getRefreshTokenApi } from "../api/auth";

//de App.js, mandamos unos props, que tenemos que traer aqui:
export default function LayoutAdmin(props) {
  // deconstructing routes:
  const { routes } = props;

  //Creamos la variable de estado:
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  // deconstructing Layout: https://ant.design/components/layout/#header
  const { Header, Footer, Content } = Layout;

  //usuario para ver si está loggeado, de useAuth:
  //deconstructing useAuth: user viene de useAuth y useAuth viene de /hooks => authContext de: /providers/AuthProvider
  const { user, isLoading } = useAuth();

  // const accessToken = getAccessTokenApi();
  // const refreshToken = getRefreshTokenApi();

  //function if para validar si ya está loggeado el usuario o no:
  if (!user && !isLoading) {
    //!isLoading si es falso, quiere decir que el usuario no está loggeado
    return (
      // Vamos a crear un Fragment, lo podemos importar o:
      <>
        <Route path='/admin/login' component={AdminSignIn} />
        {/* redirect viene de react-router-dom */}
        <Redirect to='/admin/login' />
      </>
    );
  }

  if (user && !isLoading) {
    //solo se va a mostrar contenido cuando esté loggeado el usuario
    return (
      <Layout>
        <MenuSider menuCollapsed={menuCollapsed} />
        <Layout
          className='layout-admin'
          // style={{ marginLeft: menuCollapsed ? "20px" : "20px" }}
        >
          <Header className='layout-admin__header'>
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className='layout-admin__content'>
            <LoadRouters routes={routes} />
          </Content>
          <Footer className='layout-admin__footer'>
            Raul Vap Copyright © 2020
          </Footer>
        </Layout>
      </Layout>
    );
  }
  return null;
}

function LoadRouters(props) {
  //hacemos un deconstructing para sacar las rutas, también se puede hacer directamente en la function LoadRouters({routes}){}
  const { routes } = props;

  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
