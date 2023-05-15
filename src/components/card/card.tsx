import React from "react";

import style from "./card.module.scss";

type TCard = {
  children: React.ReactNode;
};

const Card = ({ children }: TCard) => {
  return (
    <div className={style.card}>
      <div className={style.wrapper}>{children}</div>
    </div>
  );
};

export default Card;
