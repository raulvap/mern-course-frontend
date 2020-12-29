/*jshint esversion: 6 */
import React, { useState } from "react";
import { Form, Input, Button, Select, notification } from "antd";
import { FontSizeOutlined } from "@ant-design/icons";
import { addMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddMenuWebForm.scss";

export default function AddMenuWebForm(props) {
  const { setIsVisibleModal, setReloadMenuWeb } = props;

  //un estado para que se guarden los datos introducidos:
  const [menuWebData, setMenuWebData] = useState({});

  //creamos la función para addMenu:
  const addMenu = (event) => {
    // event.preventDefault();

    //hacemos una concatenación de la info obtenida, para mandarla completa al backend:
    let finalData = {
      title: menuWebData.title,
      url: (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url,
    };

    //hacemos una validación antes de mandar al servidor:
    if (!finalData.title || !finalData.url || !menuWebData.url) {
      //si falta algún campo entonces:
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    } else {
      const accessToken = getAccessTokenApi();
      finalData.active = false;
      finalData.order = -1;

      //mandamos todo al backend con la función que creamos de api:
      addMenuApi(accessToken, finalData)
        .then((response) => {
          notification["success"]({
            message: response,
          });
          setIsVisibleModal(false);
          setReloadMenuWeb(true);
          setMenuWebData({});
          finalData = {};
        })
        .catch(() => {
          notification["error"]({
            message: "Error en el servidor: ",
          });
        });
    }
  };

  return (
    <div className='add-menu-web-form'>
      <AddForm
        menuWebData={menuWebData}
        setMenuWebData={setMenuWebData}
        addMenu={addMenu}
      />
    </div>
  );
}

function AddForm(props) {
  const { menuWebData, setMenuWebData, addMenu } = props;

  // Sacamos option del componente Select de Antd
  const { Option } = Select;

  const selectBefore = (
    <Select
      defaultValue='http://'
      style={{ width: 90 }}
      onChange={(e) => setMenuWebData({ ...menuWebData, http: e })}>
      <Option value='http://'>http://</Option>
      <Option value='https://'>https://</Option>
    </Select>
  );

  return (
    <Form className='form-add'>
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
          addonBefore={selectBefore}
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
          onClick={addMenu}
          className='btn-submit'>
          Crear menú
        </Button>
      </Form.Item>
    </Form>
  );
}
