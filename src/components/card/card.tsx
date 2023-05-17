import React from "react";

import style from "./card.module.scss";

type TCard = {
  children: React.ReactNode;
  isCol?: boolean;
};

const Card = ({ children, isCol }: TCard) => {
  const styleWrapper = isCol
    ? style.wrapper + " " + style["wrapper_col"]
    : style.wrapper;

  return (
    <div className={style.card}>
      <div className={styleWrapper}>{children}</div>
    </div>
  );
};

export default Card;
