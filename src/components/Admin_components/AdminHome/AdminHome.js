import React from "react";
import { Collapse } from "antd";
import { LinkOutlined } from "@ant-design/icons";

import "./AdminHome.scss";

export default function AdminHome() {
  const { Panel } = Collapse;

  return (
    <div className='admin-home'>
      <h1>¡Bienvenido!</h1>
      <p>Esta plataforma es el resultado del curso:</p>
      <a
        href='https://www.udemy.com/course/web-personal-mern-full-stack-mongodb-express-react-node/'
        target='_blank'
        rel='noopener noreferrer'>
        <h2>
          <LinkOutlined /> Web Personal MERN Full Stack: MongoDB, Express, React
          y Node
        </h2>
      </a>
      <div className='admin-home__funciones'>
        <p>Funciones del Panel de Administración:</p>
        <Collapse>
          <Panel header='Usuarios' key='1'>
            <p>
              El panel de control de los usuarios permite dar de alta a
              Administradores de la plataforma
            </p>

            <p>
              Se puede activar o desactivar. Si están desactivados, no podrán
              acceder desde el Login
            </p>
          </Panel>
          <Panel header='Menú' key='2'>
            <p>
              En la sección de Menú, se podrá configurar la barra de tareas que
              aparece en la página pública
            </p>
            <p>
              Se puede ordenar arrastrando el menu que desee arriba o abajo y se
              acomodarán en la página pública
            </p>
          </Panel>
          <Panel header='Cursos' key='3'>
            <p>
              En la sección de Cursos, se podrá dar de alta los cursos con el ID
              que tiene Udemy para cada curso
            </p>
            <p>
              Se puede ordenar arrastrando el curso que desee arriba o abajo y
              se acomodarán en la página pública
            </p>
          </Panel>
          <Panel header='Blog' key='4'>
            <p>
              Dentro de la sección de Blog, se podrá escribir artículos con su
              URL personalizada para que aparezcan en la sección de Blog de la
              página pública
            </p>
            <p>
              Están ordenados de más reciente a más antiguo, para cambiar el
              orden se deberá cambiar la fecha de publicación
            </p>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
}
