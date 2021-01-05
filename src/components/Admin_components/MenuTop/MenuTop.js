/*jshint esversion: 6 */
import React from "react";
import "./MenuTop.scss";
//importamos la imagen:
import LogoDTech from "../../../assets/img/svg/dtech-logo-blanco.svg";
//importamos un button, icono de Ant Design:
import { Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
// import "antd/dist/antd.css";

//importamos función de logout:
import { logout } from "../../../api/auth";

export default function MenuTop(props) {
  //deconstructing props, que viene de LayoutAdmin:
  const { menuCollapsed, setMenuCollapsed } = props;

  const logoutUser = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className='menu-top'>
      <div className='menu-top__left'>
        <Button
          // className='menu-top-button'
          type='link'
          onClick={() => setMenuCollapsed(!menuCollapsed)}>
          {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <a href='/'>
          <img
            className='menu-top__left-logo'
            src={LogoDTech}
            alt='logo Development & Technology'
          />
        </a>
      </div>
      <div className='menu-top__right'>
        <Button type='link' onClick={logoutUser}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
