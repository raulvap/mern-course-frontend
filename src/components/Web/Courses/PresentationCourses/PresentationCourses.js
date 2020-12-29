/*jshint esversion: 6 */
import React from "react";

//importaremos la imagen:
import AcademyLogo from "../../../../assets/img/png/AcademyLogo.png";

import "./PresentationCourses.scss";

export default function PresentationCourses() {
  return (
    <div className='presentation-courses'>
      <img src={AcademyLogo} alt='Academia de Cursos' />
      <p>
        Al conectar estudiantes de todo el mundo con los mejores instructores,
        Udemy ayuda a las personas a alcanzar sus metas y perseguir sus sueños.
      </p>
      <p>La tienda virtual de aprendizaje y enseñanza global líder</p>
    </div>
  );
}
