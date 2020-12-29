/*jshint esversion: 6 */
import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

//import funciones para validar:
import {
  minLengthValidation,
  emailValidation,
} from "../../../utils/formValidation";

//import function API:
import { signUpApi } from "../../../api/user";

import "./RegisterForm.scss";
const minLength = 2;

export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    // va a guardar un objeto inicial
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  });

  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false,
    //cuando sean false: el input es inválido
  });

  // const handleChange = (e) => {
  //   if (e.target.name === "privacyPolicy") {
  //     setInputs({
  //       ...inputs,
  //       [e.target.name]: e.target.checked,
  //     });
  //   } else {
  //     setInputs({
  //       ...inputs,
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  // };

  function handleChange(event) {
    const { value, name, checked } = event.target;

    if (name === "privacyPolicy") {
      setInputs((prevValue) => {
        return {
          ...prevValue,
          [name]: checked,
        };
      });
    } else {
      setInputs((prevValue) => {
        return {
          ...prevValue,
          [name]: value,
        };
      });
    }
  }

  //para validar los inputs:
  function inputValidation(event) {
    //sacamos del input con deconstructing: type, name
    const { type, name, checked } = event.target;

    if (type === "email") {
      setFormValid({ ...formValid, [name]: emailValidation(event.target) });
    }
    //cuando termina de validar el email, va con la siguiente validación:
    if (type === "password") {
      setFormValid({
        ...formValid,
        [name]: minLengthValidation(event.target, minLength),
      });
    }
    //cuando termina de validar la contraseña, va con la siguiente validación:
    if (type === "checkbox") {
      //si se modifica el checkbox, entonces va a cambiar el estado en el objeto de validación:
      setFormValid({ ...formValid, [name]: event.target.checked });
    }
  }

  //función para registrar el usuario una vez que está validado:
  async function register(event) {
    event.preventDefault();
    //deconstructing para sacar del estado de validación: email, password, repeatPassword, privacyPolicy
    //**OJO, solo sacer la info de 1 objeto para que no haga error
    const { email, password, repeatPassword, privacyPolicy } = formValid;

    if (
      !inputs.name ||
      !inputs.lastName ||
      !inputs.password ||
      !inputs.repeatPassword
    ) {
      //si no hay información en algun campo: usamos notification (componente que importamos de ant-design)
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      //ya que todos los campos se comprobaron, ahora veremos que la contraseñas coincidan:
      if (!password) {
        notification["error"]({
          message:
            "La contraseña debe tener un mínimo de " + minLength + " carateres",
        });
      } else {
        if (!email) {
          notification["error"]({
            message: "Ingrese un correo válido",
          });
        } else {
          if (inputs.password !== inputs.repeatPassword) {
            notification["error"]({
              message: "Las contraseñas no coinciden",
            });
          } else {
            if (!privacyPolicy) {
              notification["error"]({
                message: "Debe aceptar la Política de Privacidad",
              });
            } else {
              // TO DO: CONECTAR CON EL API Y REGISTRAR EL USUARIO
              // de la función de api/user.js:
              const result = await signUpApi(inputs);
              //con await, para seguir al siguiente paso, va a esperar al resultado de signUpApi()

              if (!result.ok) {
                notification["error"]({ message: "DB: " + result.message });
              } else {
                notification["success"]({ message: result.message });
                //ahora para resetear el formulario:
                resetForm();
              }
            }
          }
        }
      }
    }
  }

  //para resetar el formulario:
  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
    }

    setInputs({
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false,
    });

    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false,
    });
  };

  return (
    <Form className='register-form' onSubmit={register} onChange={handleChange}>
      <Form.Item>
        <Input
          prefix={
            <UserOutlined type='user' style={{ color: "rgba(0,0,0,.25" }} />
          }
          // si queremos añadir una propiedad dentro alguna propiedad de otro componente es con {}
          type='text'
          name='name'
          placeholder=' Nombre'
          autoComplete='off'
          className='register-form__input'
          value={inputs.name}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={
            <UserOutlined type='user' style={{ color: "rgba(0,0,0,.25" }} />
          }
          // si queremos añadir una propiedad dentro alguna propiedad de otro componente es con {}
          type='text'
          name='lastName'
          placeholder=' Apellido'
          autoComplete='off'
          className='register-form__input'
          value={inputs.lastName}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={
            <MailOutlined type='user' style={{ color: "rgba(0,0,0,.25" }} />
          }
          // si queremos añadir una propiedad dentro alguna propiedad de otro componente es con {}
          type='email'
          name='email'
          placeholder=' Correo electrónico'
          autoComplete='off'
          className='register-form__input'
          value={inputs.email}
          onChange={inputValidation}
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
          placeholder=' Contraseña'
          autoComplete='off'
          className='register-form__input'
          value={inputs.password}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={
            <LockOutlined type='user' style={{ color: "rgba(0,0,0,.25" }} />
          }
          // si queremos añadir una propiedad dentro alguna propiedad de otro componente es con {}
          type='password'
          name='repeatPassword'
          placeholder=' Repetir Contraseña'
          autoComplete='off'
          className='register-form__input'
          value={inputs.repeatPassword}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name='privacyPolicy'
          checked={inputs.privacyPolicy}
          onChange={inputValidation}>
          He leído y acepto la política de privacidad
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button
          htmlType='submit'
          onClick={register}
          className='register-form__button'>
          Crear usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
