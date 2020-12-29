/*jshint esversion: 6 */
import React from "react";
// vamos a darle un alias a Modal de Antd para que no tenga conflicto con el componente:
import { Modal as ModalAntd } from "antd";

export default function Modal(props) {
  // deconstructing props:
  const { children, title, isVisible, setIsVisible, ...other } = props;
  //al poner: ...other, estamos metiendo ahí todas las demás variables.

  return (
    <ModalAntd
      title={title}
      centered
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={false}
      {...other}
      // aqui se ponen automaticamente las demás propiedades
    >
      {children}
    </ModalAntd>
  );
}
