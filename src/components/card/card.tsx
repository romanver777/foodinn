import React from "react";

import style from "./card.module.scss";

type TCard = {
  children: React.ReactNode;
  isCol?: boolean;
  newClass?: string;
};

const Card = ({ children, isCol, newClass }: TCard) => {
  const styleWrapper = isCol
    ? style.wrapper + " " + style["wrapper_col"]
    : style.wrapper;
  const styleCard = newClass
    ? style.card + " " + style[`${newClass}`]
    : style.card;

  return (
    <div className={styleCard}>
      <div className={styleWrapper}>{children}</div>
    </div>
  );
};

export default Card;
