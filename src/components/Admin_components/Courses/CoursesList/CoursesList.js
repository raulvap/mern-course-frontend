/*jshint esversion: 6 */
import React, { useState, useEffect } from "react";
import { List, Button, Modal as ModalAntd, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DragSortableList from "react-drag-sortable";
import Modal from "../../../Modal";

// import Token:
import { getAccessTokenApi } from "../../../../api/auth";

//import api:
import {
  getCourseDataUdemyApi,
  deleteCoursesApi,
  updateCoursesApi,
} from "../../../../api/course";

//import COMPONENTS:
import AddEditCourseForm from "../AddEditCourseFom";

import "./CoursesList.scss";

//sacamos el modal de confirmación, con deconstructing. Esto sirve para confirmar cuando quieren eliminar algo:
const { confirm } = ModalAntd;

export default function CoursesList(props) {
  //de los props sacamos:
  const { courses, setReloadCourses } = props;

  //vamos a crear los estados que necesitamos
  // 1 para guardar la lista de los cursos con array de inicio vacío
  // 1 para hacer visible o no el modal con false de inicio
  // 1 para definir el title del modal con string vacío
  // 1 para definir el contenido del modal con null
  const [listCourses, setListCourses] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  //creamos la función onSort para ordenar los items. Esta se va a usar en componente DragSorteableList
  const onSort = (sortedList, dropEvent) => {
    //vamos a obtener el token:
    const accessToken = getAccessTokenApi();

    sortedList.forEach((item) => {
      const { _id } = item.content.props.course;
      const order = item.rank;

      updateCoursesApi(accessToken, _id, { order });
    });
  };

  //función para borrar cursos de la Base de Datos:
  const deleteCourse = (course) => {
    const accessToken = getAccessTokenApi();

    //vamos a mostrar una confirmación de eliminación:
    confirm({
      title: "Eliminar Curso",
      content: `¿Estás seguro que quieres eliminar el curso ${course.idCourse}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteCoursesApi(accessToken, course._id)
          .then((response) => {
            // vamos a usar una forma más abreviada de la respuesta:
            // const typeNotification =
            //   response.code === 200 ? "success" : "warning";

            notification["success"]({ message: response });
            // para que se actualice cuando termine:
            setReloadCourses(true);
          })
          .catch((err) => {
            notification["error"]({ message: err });
          });
      },
    });
  };

  //función para agregar un curso:
  const addCourseModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Crear nuevo curso:");
    setModalContent(
      <AddEditCourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
      />
    );
  };

  //función par actualizar un curso:
  const editCourseModal = (course) => {
    setIsVisibleModal(true);
    setModalTitle("Editar curso: " + course.idCourse);
    setModalContent(
      <AddEditCourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
        course={course}
      />
    );
  };

  //vamos a rellenar la lista con los cursos que tenemos en la base de datos:
  //se va a actualizar cada que courses cambie.
  useEffect(() => {
    const listCourseArray = [];
    //esto es porque necesitamos crear un componente con la información de los cursos en DragSorteableList
    courses.forEach((course) => {
      listCourseArray.push({
        //   le vamos a agregar al array, el componente que creamos abajo:
        content: (
          <Course
            course={course}
            deleteCourse={deleteCourse}
            editCourseModal={editCourseModal}
          />
        ),
      });
    });
    setListCourses(listCourseArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);

  return (
    <div className='courses-list'>
      <div className='courses-list__header'>
        <Button type='primary' onClick={addCourseModal}>
          Crear Curso
        </Button>
      </div>
      <div className='courses-list__items'>
        {listCourses.length === 0 && (
          <h2 style={{ textAlign: "center", margin: 0 }}>
            No hay cursos creados
          </h2>
        )}
        <DragSortableList items={listCourses} onSort={onSort} type='vertical' />
      </div>

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

//creamos un nuevo componente
function Course(props) {
  const { course, deleteCourse, editCourseModal } = props;
  //creamos un estado para guardar la info que nos llega de Udemy:
  const [courseData, setCourseData] = useState(null);

  //creamos un useEffect para que se actualice cada que se modifique
  useEffect(() => {
    //llamar a la petición:
    getCourseDataUdemyApi(course.idCourse).then((response) => {
      if (response.code !== 200) {
        notification["warning"]({
          message: `El curso con el id ${course.idCourse} no se ha encontrado en Udemy`,
        });
      }
      setCourseData(response.data);
    });
  }, [course]);

  //si courseData no tiene contenido entonces:
  if (!courseData) {
    return null;
  }

  return (
    <List.Item
      actions={[
        <Button type='primary' onClick={() => editCourseModal(course)}>
          <EditOutlined />
        </Button>,
        <Button type='danger' onClick={() => deleteCourse(course)}>
          <DeleteOutlined />
        </Button>,
      ]}>
      <img
        src={courseData.image_480x270}
        alt={courseData.title}
        style={{ width: "100px", marginRight: "20px" }}
      />
      <List.Item.Meta
        title={`ID: ${course.idCourse} | ${courseData.title}`}
        description={courseData.headline}
      />
    </List.Item>
  );
}
