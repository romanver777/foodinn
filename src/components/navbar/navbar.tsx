import React from "react";

import burgerIcon from "../../style/icons/burger.svg";
import bellIcon from "../../style/icons/bell.svg";
import userIcon from "../../style/icons/user.svg";

import style from "./navbar.module.scss";

type TProps = {
  title: string;
  isOpenSb: boolean;
  onClickHandle: React.MouseEventHandler<HTMLButtonElement>;
};

const Navbar = ({ title, isOpenSb, onClickHandle }: TProps) => {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.wrapper}>
          <button className={style["burger-btn"]} onClick={onClickHandle}>
            <img src={burgerIcon} className={style["burger-icon"]} />
          </button>
          <title className={style.title}>{title}</title>
        </div>
        <nav className={style.nav}>
          <ul className={style.list}>
            <li className={style["list-item"]}>
              <button className={style["item-link"]}>
                <img src={bellIcon} alt="Notification" className={style.icon} />
              </button>
            </li>
            <li className={style["list-item"]}>
              <button className={style["item-link"]}>
                <img
                  src={userIcon}
                  alt="User"
                  className={style.icon + " " + style["icon_width"]}
                />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
