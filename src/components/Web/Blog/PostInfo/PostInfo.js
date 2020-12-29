/*jshint esversion: 6 */
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { Spin, notification } from "antd";
import moment from "moment";
import "moment/locale/es";

import { getPostApi } from "../../../../api/post";

import "./PostInfo.scss";

export default function PostInfo(props) {
  //clase 203:
  //sacamos la url:
  const { url } = props;

  //creamos un estado para guardar la info que recibimos:
  const [postInfo, setPostInfo] = useState(null);

  //el useeffect se va a encargar de hacer la llamada de todos los datos cuando la url cambia:
  useEffect(() => {
    getPostApi(url)
      .then((response) => {
        if (response.code !== 200) {
          notification["warning"]({ message: response.message });
        } else {
          setPostInfo(response.post);
        }
      })
      .catch((err) => {
        notification["error"]({ message: "Error del servidor" });
      });
  }, [url]);

  if (!postInfo) {
    return (
      <Spin tip='Cargando' style={{ width: "100%", padding: "200px 0" }} />
    );
  }

  return (
    <>
      <Helmet>
        <title>{postInfo.title} | DTech</title>
        <meta
          name='description'
          content={postInfo.title}
          data-react-helmet='true'
        />
      </Helmet>
      <div className='post-info'>
        <h1 className='post-info__title'>{postInfo.title}</h1>
        <div className='post-info__creation-date'>
          {moment(postInfo.date).local("es").format("LL")}
        </div>

        {/* Clase 203, minuto 11:10 */}
        <div
          className='post-info__description'
          dangerouslySetInnerHTML={{ __html: postInfo.description }}
        />
      </div>
    </>
  );
}
