/*jshint esversion: 6 */
// Importamos el Layout de Admin:
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutGeneral from "../layouts/LayoutGeneral";

// Importamos las páginas Admin:
import AdminHome from "../pages/Admin/";
import AdminSignIn from "../pages/Admin/SignIn";
import AdminUsers from "../pages/Admin/Users";
import AdminMenuWeb from "../pages/Admin/MenuWeb";
import AdminCourses from "../pages/Admin/Courses";
import AdminBlog from "../pages/Admin/Blog";

//pages users:
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Courses from "../pages/Courses";
import Blog from "../pages/Blog";

//others:
import Error404 from "../pages/Error404";

// Creamos la configuración de rutas:
const routes = [
  {
    // un array de objetos
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    //es false porque el layout debe ser cargado en todos los demás componentes, es como el template
    routes: [
      {
        // otro array de objetos, dentro de cada objeto del primer array
        path: "/admin",
        component: AdminHome,
        exact: true,
        // es true, porque es la primer página de inicio del admin, solo queremos que se muestre en esa dirección
      },
      {
        //segundo objeto, dentro del array "routes"
        path: "/admin/login",
        component: AdminSignIn,
        exact: true,
        // con ese path, decimos que AdminSignIn (el componente) va a cargar exactamente con ese path
      },
      {
        // otro array de objetos, dentro de cada objeto del primer array
        path: "/admin/users",
        component: AdminUsers,
        exact: true,
        // es true, porque debe ser exacta al escribir esa ruta
      },
      {
        // otro array de objetos, dentro de cada objeto del primer array
        path: "/admin/menu",
        component: AdminMenuWeb,
        exact: true,
        // es true, porque debe ser exacta al escribir esa ruta
      },
      {
        // oobjeto para darle la dirección a courses, dentro del panel de admin:
        path: "/admin/courses",
        component: AdminCourses,
        exact: true,
        // es true, porque debe ser exacta al escribir esa ruta
      },
      {
        // objeto para darle la dirección de blog en el Panel de Admin
        path: "/admin/blog",
        component: AdminBlog,
        exact: true,
        // es true, porque debe ser exacta al escribir esa ruta
      },
      {
        //si el path que ingrese no coincide con ningún anterior, entonces llega al error 404:
        component: Error404,
      },
    ],
  },
  {
    //un segundo objeto, con las configuraciones para user_general:
    path: "/",
    component: LayoutGeneral,
    exact: false,
    //es false porque el layout debe ser cargado en todos los demás componentes, es como el template
    routes: [
      {
        //un nuevo array, dentro del segundo objeto: users_general
        //este primer objeto es para HOME
        path: "/",
        component: Home,
        exact: true,
      },
      {
        //este segundo objeto es para contact
        path: "/contact",
        component: Contact,
        exact: true,
      },
      {
        //este objeto es para courses
        path: "/courses",
        component: Courses,
        exact: true,
      },
      {
        //este objeto es para la página del blog:
        path: "/blog",
        component: Blog,
        exact: true,
      },
      {
        //este objeto es dinámico para que se actulice con la info que le da el usuario en el panel de admin:
        path: "/blog/:url",
        component: Blog,
        exact: true,
      },

      {
        //si el path que ingrese no coincide con ningún anterior, entonces llega al error 404:
        component: Error404,
      },
    ],
  },
];

export default routes;
