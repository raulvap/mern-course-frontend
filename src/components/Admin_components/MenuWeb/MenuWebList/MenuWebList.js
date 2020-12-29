/*jshint esversion: 6 */

import React, { useState, useEffect } from "react";
import { Switch, Button, List, Modal as ModalAntd, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import Modal from "../../../Modal";
import DragSortableList from "react-drag-sortable";

//import API y token:
import {
  updateMenuApi,
  activateMenuApi,
  deleteMenuApi,
} from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

//import components:
import AddMenuWebForm from "../AddMenuWebForm";
import EditMenuWebForm from "../EditMenuWebForm";

import "./MenuWebList.scss";

//sacamos el confirm del ModalAnt:
const { confirm } = ModalAntd;

export default function MenuWebList(props) {
  // sacamos por deconstructing:
  const { menu, setReloadMenuWeb } = props;

  //estado para guardar la versión del Menu:
  const [listItems, setListItems] = useState([]);

  //estado para ver el modal:
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  //estado para modificar el modal:
  const [modalTitle, setModalTitle] = useState("");

  //estado para el contenido del modal:
  const [modalContent, setModalContent] = useState(null);

  const objectArray = Object.entries(menu);
  var menuValues = [];

  objectArray.forEach(([key, value]) => {
    menuValues.push(value);
  });

  //Para usar el drag-sorteable, tenemos que construir una lista:
  useEffect(() => {
    const listItemsArray = [];

    //  Object.keys(menu).forEach((item) => {
    menuValues.forEach((item) => {
      listItemsArray.push({
        content: (
          <MenuItem
            item={item}
            activateMenu={activateMenu}
            editMenuWebModal={editMenuWebModal}
            deleteMenu={deleteMenu}
          />
        ),
      });
    });
    setListItems(listItemsArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu]);

  //para activar o desactivar un menu:
  const activateMenu = (menu, status) => {
    const accessToken = getAccessTokenApi();

    //usamos la función API:
    activateMenuApi(accessToken, menu._id, status).then((response) => {
      notification["success"]({
        message: response,
      });
    });
  };

  //Para ordenar la lista, de la documentación de "react-drag-sortable"
  const onSort = (sortedList, dropEvent) => {
    //utilizamos el token:
    const accessToken = getAccessTokenApi();

    //sacamos el id que se está modificando para cada elemento:
    sortedList.forEach((item) => {
      //sacamos el id del elemento:
      const { _id } = item.content.props.item;
      //asignamos el nuevo orden:
      const order = item.rank;
      //usamos la función creada para actualizar la DB: (mandamos el order como objeto json)
      updateMenuApi(accessToken, _id, { order });
    });
  };

  //para crear un nuevo menu:
  const addMenuWebModal = (menu) => {
    setIsVisibleModal(true);
    setModalTitle("Crear nuevo menú:");
    setModalContent(
      <AddMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
      />
    );
  };

  //para eliminar un menu;
  const deleteMenu = (menu) => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminar Menu",
      content: `¿Estás seguro que deseas eliminar el menu ${menu.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteMenuApi(accessToken, menu._id)
          .then((response) => {
            notification["success"]({ message: response });
            setReloadMenuWeb(true);
          })
          .catch((err) => {
            notification["error"]({ message: err });
          });
      },
    });
  };

  //para editar el menu:
  const editMenuWebModal = (menu) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar: ${menu.title}`);
    setModalContent(
      <EditMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
        menu={menu}
      />
    );
  };

  return (
    <div className='menu-web-list'>
      <div className='menu-web-list__header'>
        <Button type='primary' onClick={addMenuWebModal}>
          Crear Menú
        </Button>
      </div>
      <div className='menu-web-list__items'>
        <DragSortableList items={listItems} onSort={onSort} type='vertical' />
      </div>

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

//creamos un nuevo componente de cada item del menu:
function MenuItem(props) {
  //va a recibir de props:
  const { item, activateMenu, editMenuWebModal, deleteMenu } = props;

  //   De la documentación de List.Item:
  return (
    <List.Item
      actions={[
        <Switch
          defaultChecked={item.active}
          onChange={(e) => activateMenu(item, e)}
        />,
        <Button type='primary' onClick={() => editMenuWebModal(item)}>
          <EditOutlined />
        </Button>,
        <Button type='danger' onClick={() => deleteMenu(item)}>
          <DeleteOutlined />
        </Button>,
      ]}>
      <List.Item.Meta title={item.title} description={item.url} />
    </List.Item>
  );
}
