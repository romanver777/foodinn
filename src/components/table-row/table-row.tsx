import React from "react";

import style from "./table-row.module.scss";
import { TFoodTable } from "../../mocks/food-table";

type TProps = {
  food: TFoodTable;
  key: string;
};

const TableRow = (props: TProps) => {
  const { food } = props;
  const kkal = (food.prot + food.carbs) * 4 + food.fat * 9;

  return (
    <tr className={style.tr}>
      <td className={style.td}>
        <div className={style["td-title"]}>{food.title}</div>
        <tr className={style["bgy-list"]}>
          <td className={style["bgy-item"] + " " + style["bgy-prot"]}>
            {food.prot}
          </td>
          <td className={style["bgy-item"] + " " + style["bgy-fat"]}>
            {food.fat}
          </td>
          <td className={style["bgy-item"] + " " + style["bgy-carbs"]}>
            {food.carbs}
          </td>
        </tr>
      </td>
      <td className={style.td}>
        <div className={style["weight-wrapper"]}>
          <div className={style.weight}>
            {food.weight}
            {food.measure}
          </div>
          <div className={style.kkal}>{kkal}ккал</div>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
