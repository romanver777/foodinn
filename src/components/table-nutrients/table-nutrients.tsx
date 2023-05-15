import React from "react";

import Card from "../card/card";
import TableRow from "../table-row/table-row";
import style from "./table-nutrients.module.scss";

import { TFoodTable } from "../../mocks/food-table";

type TProps = {
  food: TFoodTable[];
};

const TableNutrients = ({ food }: TProps) => {
  const date = new Date();
  const formatDate = date.toLocaleString(undefined, {
    day: "2-digit",
    month: "2-digit",
    weekday: "short",
  });

  return (
    <Card>
      <div className={style.header}>
        <div className={style.date}>{formatDate}</div>
      </div>
      {!!food.length && (
        <div className={style.body}>
          <table className={style.table}>
            <thead className={style.thead}>
              <th className={style.colName}>Название</th>
              <th className={style.colWeight}>Вес</th>
            </thead>
            <tbody className={style.tbody}>
              {food.map((item: TFoodTable) => (
                <TableRow food={item} key={item.title} />
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!food.length && (
        <div className={style.nofood}>Список продуктов пуст</div>
      )}
    </Card>
  );
};

export default TableNutrients;
