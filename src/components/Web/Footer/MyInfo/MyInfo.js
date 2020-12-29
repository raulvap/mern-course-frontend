/*jshint esversion: 6 */
import React from "react";

//importamos el componente de las redes sociales:
import SocialLink from "../../SocialLinks";

import LogoWhite from "../../../../assets/img/svg/dtech-logo-blanco.svg";
import "./MyInfo.scss";

export default function MyInfo() {
  return (
    <div className='my-info'>
      <a href='/'>
        <img src={LogoWhite} alt='Development & Technology' />
      </a>
      <h4>Esta web se hizo con el Curso de Udemy:</h4>
      <a
        href='https://www.udemy.com/course/web-personal-mern-full-stack-mongodb-express-react-node/'
        target='_blank'
        rel='noopener noreferrer'>
        Web Personal MERN Full Stack: MongoDB, Express, React y Node
      </a>
      <SocialLink />
    </div>
  );
}
