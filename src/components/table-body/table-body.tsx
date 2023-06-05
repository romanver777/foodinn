import React from "react";

import TableMainList from "../table-main-list/table-main-list";
import TableSearchList from "../table-search-list/table-search-list";
import style from "./table-body.module.scss";

import { TFood } from "../../mocks/food";

type TFoodWeight = {
  id: number;
  weight: number | null;
};

type TTableBody = {
  food: TFood[];
  foodWeight?: TFoodWeight[];
  noFoodMessage?: string;
};

const TableBody = ({ food, foodWeight, noFoodMessage }: TTableBody) => {
  if (food.length === 0)
    return <div className={style.nofood}>{noFoodMessage}</div>;

  return (
    <table className={style.table}>
      <tbody className={style.tbody}>
        {foodWeight !== undefined ? (
          <TableMainList food={food} foodWeight={foodWeight} />
        ) : (
          <TableSearchList food={food} />
        )}
      </tbody>
    </table>
  );
};

export default TableBody;
