/*jshint esversion: 6 */
import React, { useState, useEffect } from "react";

//debemos englobar el componente con "withRouter" para que nos diga en que página estamos:
import { withRouter } from "react-router-dom";
import { Button, notification } from "antd";
import Modal from "../../../components/Modal";
import queryString from "query-string";
import { getPostsApi } from "../../../api/post";

//import components:
import PostLists from "../../../components/Admin_components/Blog/PostLists";
import Pagination from "../../../components/Pagination";
import AddEditPostForm from "../../../components/Admin_components/Blog/AddEditPostForm";

import "./Blog.scss";

function Blog(props) {
  //de props vamos a recibir en el componente:
  const { location, history } = props;

  //creamos el estado para guardar la info de los posts:
  const [posts, setPosts] = useState(null);

  //creamos otro esta para recargar posts cuando se modifique:
  const [reloadPosts, setReloadPosts] = useState(false);

  // Para usar el queryString: (clase 190, minuto 7:00)
  const { page = 1 } = queryString.parse(location.search);

  //para que se conecte a la Base de Datos:
  useEffect(() => {
    //al api le pasamos los parámtros: 12 elementos x página, y el número de página que estemos:
    getPostsApi(8, page)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({ message: response.message });
        } else {
          setPosts(response.posts);
        }
      })
      .catch((err) => {
        notification["error"]({ message: "Error del servidor" });
      });
    //para que se actualice:
    setReloadPosts(false);
  }, [page, reloadPosts]);

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  //función para agregar post:
  const addPost = () => {
    setIsVisibleModal(true);
    setModalTitle("Nuevo Post");
    setModalContent(
      <AddEditPostForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadPosts={setReloadPosts}
        post={null}
      />
    );
  };

  //función para editar post:
  const editPost = (post) => {
    setIsVisibleModal(true);
    setModalTitle("Editar Post");
    setModalContent(
      <AddEditPostForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadPosts={setReloadPosts}
        post={post}
      />
    );
  };

  if (!posts) {
    return null;
  }

  return (
    <div>
      <div className='blog'>
        <div className='blog__add-post'>
          <Button type='primary' onClick={addPost}>
            Crear Post
          </Button>
        </div>

        <PostLists
          posts={posts}
          setReloadPosts={setReloadPosts}
          editPost={editPost}
        />
        <Pagination posts={posts} location={location} history={history} />

        <Modal
          title={modalTitle}
          isVisible={isVisibleModal}
          setIsVisible={setIsVisibleModal}
          width='50%'>
          {modalContent}
        </Modal>
      </div>
    </div>
  );
}

export default withRouter(Blog);
