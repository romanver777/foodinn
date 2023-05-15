import React from "react";

import CardNutrientsList from "../card-nutrients-list/card-nutrients-list";
import TableNutrients from "../table-nutrients/table-nutrients";

import style from "./main-page.module.scss";
import { foodTable } from "../../mocks/food-table";

const MainPage = () => {
  return (
    <>
      <div className={style.row}>
        <CardNutrientsList />
      </div>
      <div className={style.row}>
        <TableNutrients food={foodTable} />
      </div>
    </>
  );
};

export default MainPage;
