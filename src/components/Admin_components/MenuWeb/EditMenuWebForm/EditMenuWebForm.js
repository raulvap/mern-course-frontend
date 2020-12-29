/*jshint esversion: 6 */

import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";

//importamos la API:
import { updateMenuApi } from "../../../../api/menu";

//importamos el token:
import { getAccessTokenApi } from "../../../../api/auth";

// importamos el estilo:
import "./EditMenuWebForm.scss";

//creamos el componente:
export default function EditMenuWebForm(props) {
  //sacamos de los props:
  const { setIsVisibleModal, setReloadMenuWeb, menu } = props;

  //creamos un nuevo estado para la información a editar:
  const [menuWebData, setMenuWebData] = useState(menu);

  //useEffect para que actualice la página si cambia el valor de menu:
  useEffect(() => {
    setMenuWebData(menu);
  }, [menu]);

  //función para editar el menu:
  const editMenu = (event) => {
    event.preventDefault();

    if (!menuWebData.title || !menuWebData.url) {
      notification["error"]({
        message: "Se requiere Titulo y URL",
      });
    } else {
      const accesToken = getAccessTokenApi();

      updateMenuApi(accesToken, menuWebData._id, menuWebData)
        .then((response) => {
          notification["success"]({
            message: response,
          });
          setIsVisibleModal(false);
          setReloadMenuWeb(true);
        })
        .catch(() => {
          notification["error"]({
            message: "Error del servidor, intentelo más tarde.",
          });
        });
    }
  };

  return (
    <div className='edit-menu-web-form'>
      <EditForm
        menuWebData={menuWebData}
        setMenuWebData={setMenuWebData}
        editMenu={editMenu}
      />
    </div>
  );
}

//componente interno para el formulario:
function EditForm(props) {
  const { menuWebData, setMenuWebData, editMenu } = props;

  return (
    <Form className='form-edit' onSubmit={editMenu}>
      <Form.Item>
        <Input
          prefix={<FontSizeOutlined />}
          placeholder='Titulo'
          value={menuWebData.title}
          onChange={(e) =>
            setMenuWebData({ ...menuWebData, title: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LinkOutlined />}
          placeholder='URL'
          value={menuWebData.url}
          onChange={(e) =>
            setMenuWebData({ ...menuWebData, url: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          onClick={editMenu}
          className='btn-submit'>
          Actualizar menú
        </Button>
      </Form.Item>
    </Form>
  );
}
