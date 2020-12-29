/*jshint esversion: 6 */
import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, DatePicker, notification } from "antd";
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";

//importamos los paquetes que agregamos en hyper:
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";

import { getAccessTokenApi } from "../../../../api/auth";
import { addPostApi, updatePostApi } from "../../../../api/post";

import "./AddEditPostForm.scss";

export default function AddEditPostForm(props) {
  //de los props sacamos:
  const { setIsVisibleModal, setReloadPosts, post } = props;

  //creamos un estado para guardar la info del post a crear/editar
  const [postData, setPostData] = useState({});

  //creamos un useEffect para que se recargue cada vez que llega un post:
  useEffect(() => {
    if (post) {
      //si hay un post, entonces se va a editar:
      setPostData(post);
    } else {
      //si no hay post, entonces se va a crear uno nuevo
      setPostData({});
    }
  }, [post]);

  //función para agregar/editar posts:
  const processPost = (e) => {
    e.preventDefault();

    //vamos a sacar de postData:
    const { title, url, date } = postData;

    //hacemos unas comprobaciones:
    if (!title || !url || !date) {
      notification["error"]({
        message: "Se requiere Titulo, Url y Fecha para guardar el post",
      });
    } else {
      if (!post) {
        //si no hay post, que viene en los props:
        addPost();
      } else {
        updatePost();
      }
    }
  };

  //función para agregar data al post de la base de datos:
  const addPost = () => {
    //clase 198
    const accessToken = getAccessTokenApi();

    addPostApi(accessToken, postData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({ message: response.message });
        setIsVisibleModal(false);
        setReloadPosts(true);
        setPostData({});
      })
      .catch((err) => {
        notification["error"]({ message: "Error del servidor" });
      });
  };

  //función para agregar el post actualizado a la base de datos:
  const updatePost = () => {
    const accessToken = getAccessTokenApi();

    //   a la función de updatePostApi le mandamos el token, el id de la base de datos, y la info que vamos a actualizar:
    updatePostApi(accessToken, post._id, postData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({ message: response.message });
        setIsVisibleModal(false);
        setReloadPosts(true);
        setPostData({});
      })
      .catch(() => {
        notification["error"]({ message: "Error del servidor" });
      });
  };

  return (
    <div className='add-edit-post-form'>
      <AddEditForm
        postData={postData}
        setPostData={setPostData}
        post={post}
        processPost={processPost}
      />
    </div>
  );
}

//vamos a crear una función para transformar el texto ingreso en la url:
function transformTextToUrl(text) {
  const url = text.replace(" ", "-");
  return url.toLowerCase();
}

//creamos un componente para el formulario:
function AddEditForm(props) {
  const { postData, setPostData, post, processPost } = props;

  return (
    <Form className='add-edit-post-form' layout='inline' onSubmit={processPost}>
      <Row gutter={24}>
        <Col span={8}>
          <Input
            prefix={<FontSizeOutlined />}
            placeholder='Titulo'
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
        </Col>
        <Col span={8}>
          <Input
            prefix={<LinkOutlined />}
            placeholder='url'
            value={postData.url}
            onChange={
              (e) =>
                setPostData({
                  ...postData,
                  url: transformTextToUrl(e.target.value),
                })
              //   la url debe ir con guiones en lugar de espacios
            }
          />
        </Col>
        <Col span={8}>
          <DatePicker
            style={{ width: "100%" }}
            format='DD/MM/YYYY HH:mm:ss'
            placeholder='Fecha de publicación'
            value={postData.date && moment(postData.date)}
            // clase 197, minuto 9:00
            onChange={(e, value) =>
              setPostData({
                ...postData,
                date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString(),
              })
            }
          />
        </Col>
      </Row>

      {/* Clase 196:  */}
      <Editor
        //   clase 198: min 0:00
        value={postData.description ? postData.description : ""}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            // eslint-disable-next-line no-multi-str
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
        }}
        // clase 198, min 7:20
        onBlur={(e) =>
          setPostData({ ...postData, description: e.target.getContent() })
        }
      />

      <Button
        type='primary'
        htmlType='submit'
        className='btn-submit'
        onClick={processPost}>
        {post ? "Actualizar post" : "Crear post"}
      </Button>
    </Form>
  );
}
