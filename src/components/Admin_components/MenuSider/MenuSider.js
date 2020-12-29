/*jshint esversion: 6 */
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  MenuOutlined,
  BookOutlined,
  MessageOutlined,
} from "@ant-design/icons";

import "./MenuSider.scss";
import "antd/dist/antd.css";

function MenuSider(props) {
  //sacamos sider de Layout:
  const { Sider } = Layout;
  //sacamos menuCollapsed de props:
  const { menuCollapsed } = props;

  //De la Sección 9, clase 91 hacemos las modificaciones:
  //Haciendo un deconstructing, sacamos Location, que usaremos como defaultSelectedKeys

  return (
    <Sider className='menu-sider' collapsed={menuCollapsed}>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={[Location.pathname]}>
        <Menu.Item key='/admin'>
          <Link to={"/admin"}>
            <HomeOutlined />
            <span className='nav-text'>Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='/admin/users'>
          <Link to={"/admin/users"}>
            <UserOutlined />
            <span className='nav-text'>Usuarios</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='/admin/menu'>
          <Link to={"/admin/menu"}>
            <MenuOutlined />
            <span className='nav-text'>Menú</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='/admin/courses'>
          <Link to='/admin/courses'>
            {/* también pueden ir sin variables {}, porque definimos la Key */}

            <BookOutlined />

            <span className='nav-text'>Cursos</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='/admin/blog'>
          <Link to='/admin/blog'>
            {/* también pueden ir sin variables {}, porque definimos la Key */}

            <MessageOutlined />

            <span className='nav-text'>Blog</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default withRouter(MenuSider);
