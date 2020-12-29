/*jshint esversion: 6 */
import React, { useEffect, useState } from "react";
import { getMenuApi } from "../../../api/menu";

//import components:
import MenuWebList from "../../../components/Admin_components/MenuWeb/MenuWebList";

export default function MenuWeb() {
  //creamos un estado para guardar el menú
  const [menu, setMenu] = useState({});
  //creamos otro estado:
  const [reloadMenuWeb, setReloadMenuWeb] = useState(false);

  //para que cuando reloadMenuWeb cambie, se vuelva a refrescar automaticamente la página:
  useEffect(() => {
    getMenuApi().then((response) => {
      //aqui llegan los menus de la base de datos
      setMenu(response.menu);
    });
    setReloadMenuWeb(false);
  }, [reloadMenuWeb]);

  return (
    <div className='menu-web'>
      <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb} />
    </div>
  );
}
