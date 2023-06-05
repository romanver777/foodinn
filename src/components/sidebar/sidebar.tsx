import React from "react";
import { Link } from "react-router-dom";

import crossIcon from "../../style/icons/cross.svg";
import style from "./sidebar.module.scss";
import { TRoute } from "../../routes/routes";

type TProps = {
  routes: TRoute[];
  activePage: string;
  isOpen: boolean;
  onClickHandle: () => void;
};

const Sidebar = ({ routes, activePage, isOpen, onClickHandle }: TProps) => {
  const getActivePageClass = (page: string) =>
    activePage === page ? style["list-item_active"] : "";

  const sidebar = isOpen
    ? style.sidebar + " " + style["sidebar_open"]
    : style.sidebar;
  const btnStyle = isOpen
    ? style["burger-btn"] + " " + style["burger-btn_visible"]
    : style["burger-btn"];

  return (
    <div className={sidebar}>
      <button className={btnStyle} onClick={onClickHandle}>
        <img src={crossIcon} className={style["cross-icon"]} />
      </button>
      <div className={style["logo-wrapper"]}>
        <div className={style.logo + " " + style["logo_border-round"]}>
          Food in numbers
        </div>
      </div>
      <nav className={style.nav}>
        <ul className={style.list}>
          {routes.map((item: TRoute) => (
            <li
              key={item.name}
              className={
                style["list-item"] + " " + getActivePageClass(item.path)
              }
            >
              <Link
                to={item.path}
                className={
                  style.link + " " + style[`link_icon-${item.iconName}`]
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
