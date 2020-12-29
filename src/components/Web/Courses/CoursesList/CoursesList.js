/*jshint esversion: 6 */
import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Rate, notification } from "antd";

//importar función de conexión API con UDEMY:
import { getCourseDataUdemyApi } from "../../../../api/course";

import "./CoursesList.scss";

export default function CoursesList(props) {
  //sacamos los courses que nos manda la página de courses:
  const { courses } = props;

  console.log(courses);

  return (
    <div className='courses-list'>
      <Row>
        {/* vamos a hacer un .map para el array de todos los cursos que vamos a recibir */}
        {courses.map((course) => (
          <Col key={course._id} md={8} className='courses-list__course'>
            <Course course={course} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

function Course(props) {
  //de props sacamos:
  const { course } = props;
  //sacamos Meta de Card:
  const { Meta } = Card;

  //estado para guardar la URL:
  const [urlCourse, setUrlCourse] = useState("");

  // creamos un estado para sacar la info de los cursos:
  const [courseInfo, setCourseInfo] = useState({});

  // console.log(courseInfo);

  //para que cada que se actualice course, se actualice la info:
  useEffect(() => {
    getCourseDataUdemyApi(course.idCourse)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({ message: response.message });
        } else {
          setCourseInfo(response.data);
          mountUrl(response.data.url);
        }
      })
      .catch((err) => {
        notification["error"]({ message: "Error del servidor (301)" });
      });
  }, [course]);

  //función para construir la URL:
  const mountUrl = (url) => {
    if (!course.link) {
      const baseUrl = `https://www.udemy.com${url}`;
      const finalUrl =
        baseUrl + (course.coupon ? `?couponCode=${course.coupon}` : "");
      setUrlCourse(finalUrl);
    } else {
      setUrlCourse(course.link);
    }
  };

  return (
    <a href={urlCourse} target='_blank' rel='noopener noreferrer'>
      <Card
        cover={<img src={courseInfo.image_480x270} alt={courseInfo.title} />}>
        <Meta title={courseInfo.title} description={courseInfo.headline} />
        <Button>Ver Curso</Button>
        <div className='courses-list__course-footer'>
          <span>{course.price ? `MX ${course.price}` : courseInfo.price}</span>
          <div>
            <Rate disabled defaultValue={5} />
          </div>
        </div>
      </Card>
    </a>
  );
}
