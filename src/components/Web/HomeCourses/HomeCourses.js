import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "antd";

import "./HomeCourses.scss";

//importar las imagenes miniaturas, como no son componentes, empiezan en minusculas:
import reactJsHooks from "../../../assets/img/jpg/react-js-hooks.jpg";
import reactNative from "../../../assets/img/jpg/react-native.jpg";
import javaScript from "../../../assets/img/jpg/javascript-es6.jpg";
import wordPress from "../../../assets/img/jpg/wordpress.jpg";
import prestaShop from "../../../assets/img/jpg/prestashop-1-7.jpg";
import cssGrid from "../../../assets/img/jpg/css-grid.jpg";

export default function HomeCourses() {
  return (
    <Row className='home-courses'>
      <Col lg={24} className='home-courses__title'>
        <h2>Aprende y mejora tus habilidades</h2>
      </Col>
      <Col lg={4} />
      <Col lg={16}>
        <Row className='row-courses'>
          {/* aqui insertamos el componente creado más abajo: */}
          <Col md={6}>
            <CardCourse
              image={reactJsHooks}
              title='React Js hooks'
              subtitle='Intermedio - React/Javascript'
              link='https://www.udemy.com/'
            />
          </Col>
          <Col md={6}>
            <CardCourse
              image={reactNative}
              title='React Native Expo'
              subtitle='Intermedio - React/Javascript'
              link='https://www.udemy.com/'
            />
          </Col>
          <Col md={6}>
            <CardCourse
              image={javaScript}
              title='JavaScript ES6'
              subtitle='Básico - Javascript'
              link='https://www.udemy.com/'
            />
          </Col>
          <Col md={6}>
            <CardCourse
              image={wordPress}
              title='Wordpress'
              subtitle='Básico - Wordpress'
              link='https://www.udemy.com/'
            />
          </Col>
        </Row>
        <Row className='row-courses'>
          <Col md={6}>
            <CardCourse
              image={prestaShop}
              title='Prestashop 1.7'
              subtitle='Básico - Prestashop'
              link='https://www.udemy.com/'
            />
          </Col>

          <Col md={6} />
          <Col md={6} />
          <Col md={6}>
            <CardCourse
              image={cssGrid}
              title='CSS Grid'
              subtitle='Intermedio - CSS'
              link='https://www.udemy.com/'
            />
          </Col>
        </Row>
      </Col>

      <Col lg={4} />
      <Col lg={24} className='home-courses__more'>
        <Link to='/courses'>
          <Button>Ver más</Button>
        </Link>
      </Col>
    </Row>
  );
}

//Vamos a crear un componente para que esté dentro de Curso
function CardCourse(props) {
  //sacamos las propiedades que le mandamos:
  const { image, title, subtitle, link } = props;
  const { Meta } = Card;

  return (
    <a href={link} target='_blank' rel='noopener noreferrer'>
      <Card
        className='home-courses__card'
        cover={<img src={image} alt={title} />}
        actions={[<Button>INGRESAR</Button>]}>
        <Meta title={title} subtitle={subtitle} />
      </Card>
    </a>
  );
}
