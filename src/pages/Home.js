import React from "react";

//importamos helmet para cambiar la metadata de la página:
import { Helmet } from "react-helmet";

//importar componentes:
import MainBanner from "../components/Web/MainBanner";
import HomeCourses from "../components/Web/HomeCourses";
import HowMyCoursesWork from "../components/Web/HowMyCoursesWork";
import ReviewsCourses from "../components/Web/ReviewsCourses";
// import Courses from "./Courses";

function Home() {
  return (
    <>
      <Helmet>
        <title>DTech Academy</title>
        <meta
          name='description'
          content='Dtech Academy, desarrolla tus habilidades tecnológicas'
          data-react-helmet='true'
        />
      </Helmet>
      <MainBanner />
      <HomeCourses />
      <HowMyCoursesWork />
      <ReviewsCourses />
      {/* <Courses /> */}
    </>
  );
}

export default Home;
