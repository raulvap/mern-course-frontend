/*jshint esversion: 6 */
import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Avatar,
  Button,
  notification,
  Modal as ModalAntd,
} from "antd";
import {
  EditOutlined,
  StopOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/png/avatar.png";

//importamos  COMPONENTES:
import Modal from "../../../Modal/";
import EditUserForm from "../EditUserForm/";
import AddUserForm from "../AddUserForm/";

//importamos la API para conectarse al Backend y traer la imagen:
import {
  getAvatarApi,
  activateUserApi,
  deleteUserApi,
} from "../../../../api/user";

//importamos el Token de Auténtificación:
import { getAccessTokenApi } from "../../../../api/auth";

import "./ListUsers.scss";
// import { logRoles } from "@testing-library/react";

//Sacamos el confirm de Modal:
const { confirm } = ModalAntd;

//******************** FUNCIONES: *************************************

export default function ListUsers(props) {
  //esta función recibe props, las cuales con deconstructing:
  const { usersActive, usersInactive, setReloadUsers } = props;

  //creamos un estado para ver los usuarios, y para el modal:
  const [viewUsersActive, setviewUsersActive] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const addUserModal = () => {
    //abre el modal: **recordar que son estados que están en componentes
    setIsVisibleModal(true);
    setModalTitle("Nuevo Usuario");
    setModalContent(
      <AddUserForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <div className='list-users'>
      <div className='list-users__header'>
        {/* Usamos el componente Switch de antd con las props: */}
        <div className='list-users__header-switch'>
          <Switch
            defaultChecked
            onChange={() => setviewUsersActive(!viewUsersActive)}
          />
          <span>
            {viewUsersActive ? "Usuarios Activos" : "Usuarios Inactivos"}
          </span>
        </div>
        <Button type='primary' onClick={addUserModal}>
          Nuevo Usuario
        </Button>
      </div>

      {/* Si el estado de viewUsers es true, devuelve el componente de usersActive, si no, Inactivos: */}
      {/* Mandamos en los compomentes la lista, con props: */}
      {viewUsersActive ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
        />
      )}

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

//creamos los componentes con los props:
function UsersActive(props) {
  //deconstructing:
  const {
    usersActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadUsers,
  } = props;

  //creamos una función para editar el usuario:
  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${user.name ? user.name : user.email} 
      ${user.lastName ? user.lastName : ""}`
    );
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    //   usamos List de antd, con las props: (podemos buscar la documentation)
    <List
      className='users-active'
      itemLayout='horizontal'
      dataSource={usersActive}
      renderItem={(user) => (
        <UserActive
          user={user}
          editUser={editUser}
          setReloadUsers={setReloadUsers}
        />
      )}
    />
  );
}

//este componente es para renderizar los usuarios activo:
function UserActive(props) {
  const { user, editUser, setReloadUsers } = props;
  //creamos un estado:
  const [avatar, setAvatar] = useState(null);

  //creamos un useEffect que se va a actualizar cada que el usuario cambie:
  useEffect(() => {
    if (user.avatar) {
      //si existe el avatar, entonces:
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const deactiveUser = () => {
    const accessToken = getAccessTokenApi();
    //obtenemos el token

    //mandamos el token, user, y status a la función:
    activateUserApi(accessToken, user._id, false)
      .then((response) => {
        notification["success"]({ message: response });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({ message: err });
      });
  };

  //función para que muestre el deleteConfirm
  const showDeleteConfirm = () => {
    //obtenemos el token:
    const accessToken = getAccessTokenApi();

    //modal de confirmación: **ver documentación en AntD
    confirm({
      //es una función con un objeto, title, content (descripción)
      title: "Eliminar usuario",
      content: `¿Estás seguro que deseas eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accessToken, user._id)
          .then((response) => {
            notification["success"]({ message: response });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["error"]({ message: err });
          });
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button type='primary' onClick={() => editUser(user)}>
          <EditOutlined />
        </Button>,
        <Button type='danger' onClick={deactiveUser}>
          <StopOutlined />
        </Button>,
        <Button type='danger' onClick={showDeleteConfirm}>
          <DeleteOutlined />
        </Button>,
      ]}>
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                  ${user.name ? user.name : " "} 
                  ${user.lastName ? user.lastName : " "} 
                `}
        description={user.email}
      />
    </List.Item>
  );
}

function UsersInactive(props) {
  const { usersInactive, setReloadUsers } = props;

  return (
    //   usamos List de antd, con las props: (podemos buscar la documentation)
    <List
      className='users-active'
      itemLayout='horizontal'
      dataSource={usersInactive}
      renderItem={(user) => (
        <UserInactive user={user} setReloadUsers={setReloadUsers} />
      )}
    />
  );
}

//este componente es para renderizar el avatar del usuario inactivo:
function UserInactive(props) {
  //solo recibe el usuario pq los usuarios inactivos no los vamos a editar
  const { user, setReloadUsers } = props;
  //creamos un estado:
  const [avatar, setAvatar] = useState(null);

  //creamos un useEffect que se va a actualizar cada que el usuario cambie:
  useEffect(() => {
    if (user.avatar) {
      //si existe el avatar, entonces:
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const activateUser = () => {
    const accessToken = getAccessTokenApi();

    //usamos la misma función del API:
    activateUserApi(accessToken, user._id, true)
      .then((response) => {
        notification["success"]({ message: response });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({ message: err });
      });
  };

  //función para que muestre el deleteConfirm
  const showDeleteConfirm = () => {
    //obtenemos el token:
    const accessToken = getAccessTokenApi();

    //modal de confirmación: **ver documentación en AntD
    confirm({
      //es una función con un objeto, title, content (descripción)
      title: "Eliminar usuario",
      content: `¿Estás seguro que deseas eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accessToken, user._id)
          .then((response) => {
            notification["success"]({ message: response });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["error"]({ message: err });
          });
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button type='primary' onClick={activateUser}>
          <CheckOutlined />
        </Button>,

        <Button type='danger' onClick={showDeleteConfirm}>
          <DeleteOutlined />
        </Button>,
      ]}>
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                  ${user.name ? user.name : " "} 
                  ${user.lastName ? user.lastName : " "} 
                `}
        description={user.email}
      />
    </List.Item>
  );
}
