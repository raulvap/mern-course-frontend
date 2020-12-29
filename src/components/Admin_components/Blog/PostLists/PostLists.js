/*jshint esversion: 6 */
import React from "react";
import { Link } from "react-router-dom";
import { List, Button, Modal as PostModal, notification } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

//import API:
import { getAccessTokenApi } from "../../../../api/auth";
import { deletePostsApi } from "../../../../api/post";

import "./PostLists.scss";

//sacamos el confirm del modal:
const { confirm } = PostModal;

export default function PostLists(props) {
  const { posts, setReloadPosts, editPost } = props;

  //función para eliminar los posts (clase 193, min 3:50) (es lo mismo que hacer función de tipo flecha)
  function deletePost(post) {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminar post:",
      content: `¿Estás seguro que quieres eliminar el post "${post.title}"?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deletePostsApi(accessToken, post._id)
          .then((response) => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({ message: response.message });
            setReloadPosts(true);
          })
          .catch((err) => {
            notification["error"]({
              message: "Error del servidor. " + err.message,
            });
          });
      },
    });
  }

  //clase 191, minuto 5:50
  return (
    <div className='post-lists'>
      <List
        dataSource={posts.docs}
        renderItem={(post) => (
          <Post post={post} deletePost={deletePost} editPost={editPost} />
        )}
      />
    </div>
  );
}

//creamos un componente interno para que muestre cada post de la lista:
function Post(props) {
  const { post, deletePost, editPost } = props;

  //clase 190, minuto 8:45
  return (
    <List.Item
      actions={[
        <Link to={`/blog/${post.url}`} target='_blank'>
          <Button
            type='primary'
            //   para que sea dinámica la url: clase 191, minuto 12:01
            // href={`http://localhost:3000/blog/${post.url}`}
            // target='_blank'
          >
            <EyeOutlined />
          </Button>
        </Link>,
        <Button type='primary' onClick={() => editPost(post)}>
          <EditOutlined />
        </Button>,
        <Button type='danger' onClick={() => deletePost(post)}>
          <DeleteOutlined />
        </Button>,
      ]}>
      <List.Item.Meta title={post.title} />
    </List.Item>
  );
}
