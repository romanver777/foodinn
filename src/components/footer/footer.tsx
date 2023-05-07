import React from "react";

import style from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.copyright}>© 2023</div>
    </footer>
  );
};

export default Footer;
