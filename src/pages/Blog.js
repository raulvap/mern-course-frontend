/*jshint esversion: 6 */

import React from "react";
import { Helmet } from "react-helmet";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
import PostsListWeb from "../components/Web/Blog/PostsListWeb";
import PostInfo from "../components/Web/Blog/PostInfo";

export default function Blog(props) {
  //clase 201, min 4:45. De props sacamos location y history
  const { location, history } = props;
  const { url } = useParams();

  return (
    <>
      <Helmet>
        <title>Blog | DTech Academy</title>
        <meta
          name='description'
          content='Dtech Academy, desarrolla tus habilidades tecnológicas'
          data-react-helmet='true'
        />
      </Helmet>
      <Row>
        <Col md={4} />
        <Col md={16}>
          {/* vamos a hacer un condicionamiento de si hay post o no: */}
          {url ? (
            <PostInfo url={url} />
          ) : (
            <PostsListWeb location={location} history={history} />
          )}
        </Col>
        <Col md={4} />
      </Row>
    </>
  );
}
