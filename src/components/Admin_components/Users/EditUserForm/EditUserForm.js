/*jshint esversion: 6 */
import React, { useState, useEffect, useCallback } from "react";
import {
  Avatar,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  notification,
} from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
//importamos react-Dropzone:
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../../assets/img/png/avatar.png";

//importamos las API's:
import {
  getAvatarApi,
  updateUserApi,
  uploadAvatarApi,
} from "../../../../api/user";

//importamos el token
import { getAccessTokenApi } from "../../../../api/auth";

//importamos los estilos:
import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setIsVisibleModal, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  //creamos un estado para guardar los datos del usuario, inicializado con los datos que recibimos.
  const [userData, setUserData] = useState({});

  //useEffect para modificar los datos, siempre y cuando "user" se actualice:
  useEffect(() => {
    setUserData({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  }, [user]);

  //useEffect para el avatar:
  useEffect(() => {
    if (user.avatar) {
      //si existe el avatar del usuario, entonces:
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);
  //esto se va a actualizar siempre y cuando el "user" tenga cambios

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
  }, [avatar]);

  const updateUser = (e) => {
    //función para actualizar la info. e es event, para prevenir que se recargue la página cuando enviamos el formulario
    // e.preventDefault();
    const token = getAccessTokenApi();
    let userUpdate = userData;

    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales.",
        });
        return;
      } else {
        //si las contraseñas coinciden, entonces se va a cambiar:
        delete userUpdate.repeatPassword;
        //quitamos el parámetro repeatPassword de userUpdate, de la info que se va a mandar al servidor
      }
    }

    //si falta información
    // if (!userUpdate.name || !userUpdate.lastName || !userUpdate.email) {
    //   notification["error"]({
    //     message: "El nombre, apellidos y email son obligatorios.",
    //   });
    //   return;
    // }

    //si la imagen es correcta, entonces actualiza la imagen:
    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id).then((response) => {
        userUpdate.avatar = response.avatarName;
        updateUserApi(token, userUpdate, user._id).then((result) => {
          notification["success"]({
            message: result.message,
          });
        });
      });
    } else {
      updateUserApi(token, userUpdate, user._id).then((result) => {
        notification["success"]({
          message: result.message,
        });
      });
    }

    setIsVisibleModal(false);
    setReloadUsers(true);
    setUserData({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      password: "",
      repeatPassword: "",
    });
  };

  return (
    //colocamos el componente, con sus props, que creamos más abajo:
    <div className='edit-user-form'>
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
}

//creamos un componente interno para agregar imagen:
function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  //para actualizar la url del Avatar:
  useEffect(() => {
    if (avatar) {
      //si hay avatar, entonces:
      if (avatar.preview) {
        //si hay imagen, entonces:
        setAvatar(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  //useCallback viene de react. Ver documentación
  //useCallback will return a memoized version of the callback that only changes if one of the inputs has changed.
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  //vamos a hacer el useDrop:
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className='upload-avatar' {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

//creamos otro componente para editar el formulario
function EditForm(props) {
  const { userData, setUserData, updateUser } = props;

  //deconstructing Select, de antd:
  const { Option } = Select;

  return (
    // gutter: 24 columnas. Col: 12 inputs
    <Form className='form-edit' onFinish={updateUser}>
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
              placeholder='Apellidos'
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
              placeholder='Correo electrónico'
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
              placeholder='Rol de Usuario:'
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
              placeholder='Repetir Contraseña'
              value={userData.repeatPassword}
              type='password'
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='btn-submit'>
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
