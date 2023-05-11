import React from "react";

import CardNutrientsList from "../card-nutrients-list/card-nutrients-list";

import style from "./main-page.module.scss";

const MainPage = () => {
  return (
    <div className={style.row}>
      <CardNutrientsList />
    </div>
  );
};

export default MainPage;
