/*jshint esversion: 6 */
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Row, Col } from "antd";

//importamos los componentes:
import MenuTop from "../components/Web/MenuTop";
import Footer from "../components/Web/Footer";

import "./LayoutGeneral.scss";

export default function LayoutGeneral(props) {
  //recibe unos props desde ???

  //deconstructing el objeto props
  const { routes } = props;

  return (
    <>
      <Row>
        <Col lg={4} />
        <Col lg={16}>
          <MenuTop />
        </Col>
        <Col lg={4} />
      </Row>
      <LoadRoutes routes={routes} />
      <Footer />
    </>
  );
}

//este componente hará la labor de asignar las rutas:
function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
