/*jshint esversion: 6 */
import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import {
  BookOutlined,
  CodeOutlined,
  DatabaseOutlined,
  HddOutlined,
  UserOutlined,
  CodeSandboxOutlined,
} from "@ant-design/icons";

import "./NavigationFooter.scss";

export default function NavigationFooter() {
  return (
    <Row className='navigation-footer'>
      <Col md={24}>
        <h3>Navegación:</h3>
      </Col>
      <Col md={12}>
        <RenderListLeft />
      </Col>
      <Col md={12}>
        <RenderListRight />
      </Col>
    </Row>
  );
}

//creamos un componente para hacer las listas:
// *** cuando es link externo usamos <a />, cuando es link interno, usamos Link, el componente de react-router-dom
function RenderListLeft() {
  return (
    <ul>
      <li>
        <a href='#'>
          <BookOutlined /> Cursos Online
        </a>
      </li>
      <li>
        <Link to='/contact'>
          <CodeOutlined /> Desarrollo Web
        </Link>
      </li>
      <li>
        <a href='#'>
          <DatabaseOutlined />
          Base de Datos
        </a>
      </li>
    </ul>
  );
}

function RenderListRight() {
  return (
    <ul>
      <li>
        <a href='#'>
          <HddOutlined /> Cursos Online
        </a>
      </li>
      <li>
        <Link to='/contact'>
          <UserOutlined />
          Desarrollo Web
        </Link>
      </li>
      <li>
        <a href='#'>
          <CodeSandboxOutlined />
          Transformación Digital
        </a>
      </li>
    </ul>
  );
}
