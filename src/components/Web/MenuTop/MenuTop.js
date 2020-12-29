/*jshint esversion: 6 */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

import { getMenuApi } from "../../../api/menu";
import SocialLinks from "../SocialLinks";

import logoWhite from "../../../assets/img/svg/dtech-logo-blanco.svg";
import "./MenuTop.scss";

export default function MenuTop() {
  //creamos un useState para que reciba toda la info, inicializado con array vació
  const [menuData, setMenuData] = useState([]);

  //un useEffecte para que se actualice la info cuando se actualiza la info
  useEffect(() => {
    getMenuApi().then((response) => {
      const arrayMenu = [];
      response.menu.forEach((item) => {
        if (item.active) {
          arrayMenu.push(item);
        }
        //también se puede usar en lugar del if:
        // item.active && arrayMenu.push(item);
      });
      setMenuData(arrayMenu);
    });
  }, []);

  return (
    <Menu className='menu-top-web' mode='horizontal'>
      <Menu.Item className='menu-top-web__logo'>
        <Link to={"/"}>
          <img src={logoWhite} alt='Development & Technology' />
        </Link>
      </Menu.Item>

      {/* detectamos si la url es interna o externa para todos con un map: */}
      {menuData.map((item) => {
        const external = item.url.indexOf("http") > 1 ? true : false;

        if (external) {
          return (
            <Menu.Item key={item._id} className='menu-top-web__item'>
              <a href={item.url} target='_blank' rel='noopener noreferrer'>
                {item.title}
              </a>
            </Menu.Item>
          );
        }

        // eslint-disable-next-line no-lone-blocks
        {
          /* si no es externo, entonces para los internos: */
        }
        return (
          <Menu.Item key={item._id} className='menu-top-web__item'>
            <Link to={item.url}>{item.title}</Link>
          </Menu.Item>
        );
      })}

      {/* <Menu.Item className='menu-top-web__item'>
        <Link to={"/"}>Home</Link>
      </Menu.Item>

      <Menu.Item className='menu-top-web__item'>
        <Link to={"/Contact"}>Contacto</Link>
      </Menu.Item> */}

      <SocialLinks />
    </Menu>
  );
}
