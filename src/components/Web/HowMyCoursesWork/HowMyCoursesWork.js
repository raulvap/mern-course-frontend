/*jshint esversion: 6 */
import React from "react";
import { Row, Col, Card } from "antd";
import {
  ClockCircleOutlined,
  KeyOutlined,
  MessageOutlined,
  DollarCircleOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import "./HowMyCoursesWork.scss";

export default function HowMyCoursesWork() {
  return (
    <Row className='how-my-courses-work'>
      <Col lg={24} className='how-my-courses-work__title'>
        <h2>¿Cómo funcionan los cursos?</h2>
        <h3>
          Cada curso cuenta con contenido desde la web de Udemy, activa los 365
          días del año de por vida
        </h3>
      </Col>

      <Col lg={4} />
      <Col lg={16}>
        <Row className='row-cards'>
          <Col md={8}>
            <CardInfo
              icon={<ClockCircleOutlined />}
              title='Cursos y Clases'
              description='Cursos de entre 10 y 30 horas para darte los mejores conocimientos en tecnologías'
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={<KeyOutlined />}
              title='Acceso 24/7'
              description='Acceso 24 horas, 7 días a la semana'
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={<MessageOutlined />}
              title='Aprendizaje Colaborativo'
              description='Aprende de los demás dejando tus dudas con la comunidad'
            />
          </Col>
        </Row>
        <Row className='row-cards'>
          <Col md={8}>
            <CardInfo
              icon={<UserOutlined />}
              title='Mejora tus habilidades'
              description='Aprende y mejora tus habilidades para estár actualizado'
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={<DollarCircleOutlined />}
              title='Precios Bajos'
              description='Obtén el curso que necesitas a los precios más accesibles'
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={<CheckCircleOutlined />}
              title='Certificado al termino del Curso'
              description='Obtén un certificado de finalización de cada curso'
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

//creamos el componente de la tarjeta:
function CardInfo(props) {
  const { title, description, icon } = props;
  const { Meta } = Card;

  return (
    <Card className='how-my-courses-work__card'>
      <div className='icono'>{icon}</div>

      <Meta title={title} description={description} />
    </Card>
  );
}
