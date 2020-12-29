/*jshint esversion: 6 */
import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { signUpAdminApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddUserForm.scss";

export default function AddUserForm(props) {
  //sacamos las funciones de props que nos envía:
  const { setIsVisibleModal, setReloadUsers } = props;

  //creamos un nuevo estado para guardar los datos del usuario:
  const [userData, setUserData] = useState({});

  //función para agregar el usuario:
  const addUser = (event) => {
    // event.preventDefault();

    //primero validamos que tenga toda la información:
    if (
      !userData.name ||
      !userData.lastName ||
      !userData.email ||
      !userData.role ||
      !userData.password ||
      !userData.repeatPassword
    ) {
      notification["error"]({
        message: "Todos los Campos son Obligatorios.",
      });
    } else if (userData.password !== userData.repeatPassword) {
      notification["error"]({ message: "Las contraseñas no coinciden" });
    } else {
      //si todo está correcto, entonces procedemos:
      const accessToken = getAccessTokenApi();

      //usando la función API que creamos:
      signUpAdminApi(accessToken, userData)
        .then((response) => {
          notification["success"]({ message: response });

          //Para cerrar el modal (la ventana):
          setIsVisibleModal(false);
          //Para recargar la lista de usuarios:
          setReloadUsers(true);
          //para borrar el formulario de un nuevo usuario:
          setUserData({});
        })
        .catch((err) => {
          notification["error"]({ message: err });
        });
    }
  };

  return (
    <div className='add-user-form'>
      <AddForm
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
      />
    </div>
  );
}

//creamos un componente interno con el formulario:
function AddForm(props) {
  const { userData, setUserData, addUser } = props;

  //usamos la propiedad "option" de Select. Leer documentación de Antd
  const { Option } = Select;

  return (
    <Form className='form-add' onFinish={addUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder='Nombre'
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder='Apellido'
              value={userData.lastName}
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailOutlined />}
              placeholder='Correo Electrónico'
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder='Selecciona un rol'
              onChange={(e) => setUserData({ ...userData, role: e })}
              value={userData.role}>
              <Option value='admin'>Administrador</Option>
              <Option value='editor'>Editor</Option>
              <Option value='reviewer'>Visor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type='password'
              placeholder='Contraseña'
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type='password'
              placeholder='Repetir Contraseña'
              value={userData.repeatPassword}
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type='primary' htmlType='submit' className='btn-submit'>
          Crear Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
