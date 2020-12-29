/*jshint esversion: 6 */
import React from "react";
import { Pagination as PaginationAntd } from "antd";

import "./Pagination.scss";

//clase 192
export default function Pagination(props) {
  //va a recibir por props:
  const { posts, location, history } = props;

  //1 debemos sacar en qué página estamos, convirtiendolo a un entero:
  const currentPage = parseInt(posts.page);

  // para sacar el total de elementos en el array de posts:
  const totalPosts = posts.total;

  //para saber cuantos elementos va a mostrar por página:
  const pageLimit = posts.limit;

  //para que cuando hagamos click en otro número, solo recargue la lista con los nuevos elementos:
  const onChangePage = (newPage) => {
    history.push(`${location.pathname}?page=${newPage}`);
  };

  return (
    <div>
      <PaginationAntd
        className='pagination'
        defaultCurrent={currentPage}
        total={totalPosts}
        pageSize={pageLimit}
        onChange={(newPage) => onChangePage(newPage)}
      />
    </div>
  );
}
