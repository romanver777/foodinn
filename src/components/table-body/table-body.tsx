import React from "react";

import TableRow from "../table-row/table-row";
import style from "./table-body.module.scss";

import { TFood } from "../../mocks/food";

type TTableBody = {
  food: TFood[];
  noFoodMessage?: string;
};

const TableBody = ({ food, noFoodMessage }: TTableBody) => {
  if (food.length === 0)
    return <div className={style.nofood}>{noFoodMessage}</div>;

  return (
    <table className={style.table}>
      <tbody className={style.tbody}>
        {food.map((item) => (
          <TableRow food={item} key={item.title} />
        ))}
      </tbody>
    </table>
  );
};

export default TableBody;
