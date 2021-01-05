/*jshint esversion: 6 */

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Spin, Row, List, notification } from "antd";
import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet";
import moment from "moment";
import queryString from "query-string";
import Pagination from "../../../Pagination";
import { getPostsApi } from "../../../../api/post";

//de moment traemos: (para que todo lo que hagamos con moment, lo regrese en español)
import "moment/locale/es";

import "./PostsListWeb.scss";

export default function PostsListWeb(props) {
  // Clase 201, min 5:26
  const { location, history } = props;

  //creamos un estado para guardar los posts:
  const [posts, setPosts] = useState(null);

  //vamos a averiguar en qué página estamos actualmente:
  //en caso de que no venga page, le asignamos por default el valor 1
  const { page = 1 } = queryString.parse(location.search);

  //   hacemos el useeffect para que se actualice cada que cambie la página:
  useEffect(() => {
    getPostsApi(12, page)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setPosts(response.posts);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  }, [page]);

  //si no hay posts, que regrese un spin de cargando:
  if (!posts) {
    return (
      <Spin tip='Cargando' style={{ width: "100%", padding: "200px 0" }} />
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog | DTech</title>
        <meta
          name='description'
          content='Blog, últimas noticias del mundo de desarollo'
          data-react-helmet='true'
        />
      </Helmet>
      <div className='posts-list-web'>
        <h1>Blog</h1>
        <List
          itemLayout='horizontal'
          dataSource={posts.docs}
          renderItem={(post) => <Post post={post} />}
        />
        {/* Para incluir la paginación: clase 202, min 3:00. Se reutiliza el componente */}
        <Pagination posts={posts} location={location} history={history} />
      </div>
    </>
  );
}

// clase 202:
//creamos un nuevo componente para renderizar cada post:
//vamos a formatear la fecha que nos llega:

function Post(props) {
  const { post } = props;
  const day = moment(post.date).format("DD");
  const month = moment(post.date).format("MMMM");

  return (
    <List.Item className='post'>
      <Row>
        <div className='post__date'>
          <span>{day}</span>
          <span>{month}</span>
        </div>
        <Link to={`blog/${post.url}`}>
          <List.Item.Meta title={post.title} />
        </Link>
      </Row>
    </List.Item>
  );
}
