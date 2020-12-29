/*jshint esversion: 6 */
import React from "react";
import { Layout, Row, Col } from "antd";
import MyInfo from "./MyInfo";
import NavigationFooter from "./NavigationFooter";
import Newsletter from "../Newsletter";

import "./Footer.scss";

export default function Footer() {
  const { Footer } = Layout;

  return (
    <Footer className='footer'>
      <Row>
        <Col md={4} />
        <Col md={16}>
          <Row>
            <Col md={8}>
              <MyInfo />
            </Col>
            <Col md={8}>
              <NavigationFooter />
            </Col>
            <Col md={8}>
              <Newsletter />
            </Col>
          </Row>
          <Row className='footer__copyright'>
            <Col md={8}>© 2020 Copyright</Col>
            <Col md={8}>
              <a
                href='https://www.udemy.com/course/web-personal-mern-full-stack-mongodb-express-react-node/'
                target='_blank'
                rel='noopener noreferrer'>
                Desarrollado con el curso de Udemy
              </a>
            </Col>
            <Col md={8}>Aviso de Privacidad</Col>
          </Row>
        </Col>
        <Col md={4} />
      </Row>
    </Footer>
  );
}
