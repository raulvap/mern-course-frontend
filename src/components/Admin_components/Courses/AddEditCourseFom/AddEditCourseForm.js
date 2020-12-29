/*jshint esversion: 6 */
import React, { useState, useEffect } from "react";
import { notification, Form, Button, Input } from "antd";
import {
  KeyOutlined,
  GiftOutlined,
  DollarOutlined,
  LinkOutlined,
} from "@ant-design/icons";

//import API, Token:
import { getAccessTokenApi } from "../../../../api/auth";
import { addCoursesApi, updateCoursesApi } from "../../../../api/course";

import "./AddEditCourseForm.scss";

export default function AddEditCourseForm(props) {
  // de los props sacamos, course viene solo cuando editamos un curso:
  const { setIsVisibleModal, setReloadCourses, course } = props;

  //creamos un nuevo estado para guardar esta info:
  const [courseData, setCourseData] = useState({});

  // creamos un useEffect para que los datos que recibimos en course de props,
  //los podamos meter en el nuevo estado: courseData y que se muestren en el formulario:
  useEffect(() => {
    if (course) {
      setCourseData(course);
    } else {
      setCourseData({});
    }
  }, [course]);

  //función para agregar cursos:
  const addCourses = (event) => {
    event.preventDefault();

    if (!courseData.idCourse) {
      //si no tiene el id de Curso, entonces:
      notification["error"]({ message: "El ID del Curso es obligatorio" });
    } else {
      const accessToken = getAccessTokenApi();

      addCoursesApi(accessToken, courseData)
        .then((response) => {
          const typeNotification =
            response.code === 200 ? "success" : "warning";
          notification[typeNotification]({ message: response.message });
          setIsVisibleModal(false);
          setReloadCourses(true);
          setCourseData({});
        })
        .catch(() => {
          notification["error"]({ message: "Error del servidor" });
        });
    }
  };

  //función par actualizar cursos:
  const updateCourses = (event) => {
    event.preventDefault();
    const accessToken = getAccessTokenApi();

    updateCoursesApi(accessToken, course._id, courseData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({ message: response.message });
        setIsVisibleModal(false);
        setReloadCourses(true);
        setCourseData({});
      })
      .catch((err) => {
        notification["error"]({ message: "Error del servidor" });
      });
  };

  //creamos la estructura del formulario:
  return (
    <div className='add-edit-course-form'>
      <AddEditForm
        course={course}
        addCourses={addCourses}
        updateCourses={updateCourses}
        courseData={courseData}
        setCourseData={setCourseData}
      />
    </div>
  );
}

//creamos un componente interno de la estructura del formulario:
function AddEditForm(props) {
  const {
    course,
    addCourses,
    updateCourses,
    courseData,
    setCourseData,
  } = props;

  return (
    <Form
      className='form-add-edit'
      onSubmit={course ? updateCourses : addCourses}>
      <Form.Item>
        <Input
          prefix={<KeyOutlined />}
          placeholder='ID del Curso'
          value={courseData.idCourse}
          onChange={(e) =>
            setCourseData({ ...courseData, idCourse: e.target.value })
          }
          disabled={course ? true : false}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LinkOutlined />}
          placeholder='URL del curso'
          value={courseData.link}
          onChange={(e) =>
            setCourseData({ ...courseData, link: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<GiftOutlined />}
          placeholder='Cupón de Descuento (número)'
          value={courseData.coupon}
          onChange={(e) =>
            setCourseData({ ...courseData, coupon: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<DollarOutlined />}
          placeholder='Precio (número)'
          value={courseData.price}
          onChange={(e) =>
            setCourseData({ ...courseData, price: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='btn-submit'
          onClick={course ? updateCourses : addCourses}>
          {course ? "Actualizar Curso" : "Crear Curso"}
        </Button>
      </Form.Item>
    </Form>
  );
}
