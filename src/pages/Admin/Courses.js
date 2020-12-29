import React, { useState, useEffect } from "react";

//import components:
import CoursesList from "../../components/Admin_components/Courses/CoursesList";

//api import:
import { getCoursesApi } from "../../api/course";

export default function Courses() {
  //creamos un estado para guardar los courses:
  const [courses, setCourses] = useState([]);
  const [reloadCourses, setReloadCourses] = useState(false);

  //un efecto para que recargue la página cuando se actualiza reloadCourses
  useEffect(() => {
    getCoursesApi().then((response) => {
      setCourses(response.courses);
    });
    //una vez que trae los cursos, la bandera regresa a false:
    setReloadCourses(false);
  }, [reloadCourses]);

  return (
    <div className='courses'>
      <CoursesList courses={courses} setReloadCourses={setReloadCourses} />
    </div>
  );
}
