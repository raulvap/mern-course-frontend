/*jshint esversion: 6 */
import React, { useState, useEffect } from "react";
import { Row, Col, Spin, notification } from "antd";

//importamos helmet para cambiar la metadata de la página:
import { Helmet } from "react-helmet";

//importamos la función para traer los cursos de Api:
import { getCoursesApi } from "../api/course";

//importar componentes:
import PresentationCourses from "../components/Web/Courses/PresentationCourses";
import CoursesList from "../components/Web/Courses/CoursesList";

export default function Courses() {
  //creamos un nuevo estado para guardar la info de los cursos:
  const [courses, setCourses] = useState([]);

  //un useEffect para que se actualice cada que cambia “courses”
  // if (response?.code !== 200) {
  // esto quiere decir que si response tiene el parámetro "code" hace la validación,
  // si no lo tiene, entonces pasa directamente al else
  useEffect(() => {
    // const listCourseArray = [];
    getCoursesApi()
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setCourses(response.courses);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor intentlo más tarde.",
        });
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Cursos | DTech Academy</title>
        <meta
          name='description'
          content='Cursos disponibles'
          data-react-helmet='true'
        />
      </Helmet>
      <Row>
        <Col md={4} />
        <Col md={16}>
          <PresentationCourses />

          {/* vamos a hacer un condicionante: si no hay cursos, entonces muestra un spin: */}
          {!courses ? (
            <Spin
              tip='Cargando cursos'
              style={{ textAlign: "center", width: "100%", padding: "20px" }}
            />
          ) : (
            <CoursesList courses={courses} />
          )}
        </Col>
        <Col md={4} />
      </Row>
    </>
  );
}
