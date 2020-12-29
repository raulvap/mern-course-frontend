/*jshint esversion: 6 */
import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";

//importamos api:
import { signInApi } from "../../../api/user";

import "./LoginForm.scss";

export default function LoginForm() {
  const [inputs, setInput] = useState({
    //objeto inicial
    email: "",
    password: "",
  });

  function handleChange(event) {
    //deconstructing event.target:
    const { value, name } = event.target;
    setInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  const login = async (event) => {
    event.preventDefault();
    //signInApi nos devuelve una promesa, por eso para poder ver la promesa, creamos la función asyncrona
    const result = await signInApi(inputs);
    if (result.message) {
      //si llega un mensaje, entonces hay un error:
      notification["error"]({ message: "Usuario y/o contraseña incorrectos" });
    } else {
      //ahora una notificación:
      notification["success"]({ message: "¡Bienvenido!" });
      //guardamos en el localStorage:
      localStorage.setItem(ACCESS_TOKEN, result.accessToken);
      localStorage.setItem(REFRESH_TOKEN, result.refreshToken);

      //hacemos una redirección al panel de admin:
      window.location.href = "/admin";
    }
  };

  return (
    <Form className='login-form' onChange={handleChange} onSubmit={login}>
      <Form.Item>
        <Input
          prefix={
            <MailOutlined type='user' style={{ color: "rgba(0,0,0,.25" }} />
          }
          // si queremos añadir una propiedad dentro alguna propiedad de otro componente es con {}
          type='email'
          name='email'
          placeholder=' Correo Electrónico'
          className='login-form__input'
          //   value={inputs.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={
            <LockOutlined type='user' style={{ color: "rgba(0,0,0,.25" }} />
          }
          // si queremos añadir una propiedad dentro alguna propiedad de otro componente es con {}
          type='password'
          name='password'
          placeholder=' contraseña'
          className='login-form__input'
          //   value={inputs.password}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType='submit'
          onClick={login}
          className='login-form__button'>
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}
