/*jshint esversion: 6 */
import React, { useState } from "react";

//importamos de antd:
import { Form, Input, Button, notification } from "antd";
import { MailOutlined } from "@ant-design/icons";

//importar api:
import { subscribeNewsletterApi } from "../../../api/newsletter";

import "./Newsletter.scss";

export default function Newsletter() {
  //vamos a crear un estado para guardar el mail: podemos usar el shortcut: useS + tab
  const [email, setEmail] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    //ahora hacemos una validación de si el correo es válido:
    // eslint-disable-next-line no-useless-escape
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const resultEmailValidation = emailValid.test(email);

    if (!resultEmailValidation) {
      //si email NO tiene formato de email entonces:
      notification["error"]({ message: "Ingrese un correo válido" });
    } else {
      subscribeNewsletterApi(email).then((response) => {
        if (response.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          notification["success"]({ message: response.message });
          setEmail("");
        }
      });
    }
  };

  return (
    <div className='newsletter'>
      <h3>Suscríbete a nuestro Newsletter</h3>
      <Form onSubmit={onSubmit}>
        <Form.Item>
          <Input
            prefix={<MailOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
            placeholder='Correo electrónico'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            onClick={onSubmit}>
            Suscribirme
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
