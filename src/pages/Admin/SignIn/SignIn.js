/*jshint esversion: 6 */
import React from "react";
import { Helmet } from "react-helmet";
//de AntDesign importamos:
import { Layout, Tabs } from "antd";

//vamos a importar los tokens:
import { getAccessTokenApi } from "../../../api/auth";

//importamos redirect:
import { Redirect } from "react-router-dom";

//Assets:
import Logo from "../../../assets/img/svg/dtech-logo-blanco.svg";

//Components
import RegisterForm from "../../../components/Admin_components/RegisterForm/";
import LoginForm from "../../../components/Admin_components/LoginForm/";

import "./SignIn.scss";

function SignIn() {
  //deconstructing Layout y Tabs
  const { Content } = Layout;
  const { TabPane } = Tabs;

  //para que solo se muestre SignIn cuando NO haya token:
  if (getAccessTokenApi()) {
    //si la función regresa algo, entonces el usuario está loggeado
    return <Redirect to='/admin' />;
  }
  //si no regresa nada, else, entonces muestra lo siguiente:
  return (
    <>
      <Helmet>
        <title>Admin Login | DTech Academy</title>
        <meta
          name='Admin Login'
          content='Inicio de Sesión para Administradores'
          data-react-helmet='true'
        />
      </Helmet>
      <Layout className='sign-in'>
        <Content className='sign-in__content'>
          <h1 className='sign-in__content-logo'>
            <a href='/'>
              <img src={Logo} alt='Development & Technology' />
            </a>
          </h1>
          <div className='sign-in__content-tabs'>
            <Tabs type='card'>
              <TabPane tab={<span>Entrar</span>} key='1'>
                <LoginForm />
              </TabPane>
              <TabPane tab={<span>Nuevo Usuario</span>} key='2'>
                <RegisterForm />
              </TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default SignIn;
