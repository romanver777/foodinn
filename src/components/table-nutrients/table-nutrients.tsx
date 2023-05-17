import React from "react";

import TableRow from "../table-row/table-row";
import style from "./table-nutrients.module.scss";

import { TFoodTable } from "../../mocks/food-table";

type TProps = {
  food: TFoodTable[];
  date: Date;
  onHandleClick: () => void;
};

const TableNutrients = ({ food, date, onHandleClick }: TProps) => {
  const getFormatDate = (date: Date) => {
    const mNum = date.getMonth() + 1;
    const mWord = date.toLocaleString("default", { month: "long" });
    const mEndLetters = ["а", "я"];
    const day = date.toLocaleString("default", { day: "numeric" });

    if (mNum === 3 || mNum === 8) {
      return `${day} ${mWord}${mEndLetters[0]}`;
    }
    return `${day} ${mWord.slice(0, -1)}${mEndLetters[1]}`;
  };

  return (
    <>
      <div className={style.header}>
        <div className={style.date} onClick={() => onHandleClick()}>
          {getFormatDate(date).toUpperCase()}
        </div>
      </div>
      <div className={style.body}>
        {!!food.length && (
          <table className={style.table}>
            <thead className={style.thead}>
              <tr>
                <th className={style.colName}>Название</th>
                <th className={style.colWeight}>Вес</th>
              </tr>
            </thead>
            <tbody className={style.tbody}>
              {food.map((item: TFoodTable) => (
                <TableRow food={item} key={item.title} />
              ))}
            </tbody>
          </table>
        )}
        {!food.length && (
          <div className={style.nofood}>Список продуктов пуст</div>
        )}
      </div>
    </>
  );
};

export default TableNutrients;
