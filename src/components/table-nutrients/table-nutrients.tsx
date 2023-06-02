import React from "react";

import TableBody from "../table-body/table-body";
import MealList from "../meal-list/meal-list";
import style from "./table-nutrients.module.scss";

import { TFood } from "../../mocks/food";

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

type TFoodWeight = {
  id: number;
  weight: number;
};

type TProps = {
  food: TFood[];
  foodWeight?: TFoodWeight[];
  date: Date;
  onHandleClick: () => void;
};

const TableNutrients = ({ food, foodWeight, date, onHandleClick }: TProps) => {
  return (
    <>
      <div className={style.header}>
        <div className={style.date} onClick={() => onHandleClick()}>
          {getFormatDate(date).toUpperCase()}
        </div>
      </div>
      <div className={style.body}>
        <TableBody
          food={food}
          foodWeight={foodWeight}
          noFoodMessage="Список продуктов пуст"
        />
      </div>
      <div className={style.footer}>
        <MealList />
      </div>
    </>
  );
};

export default TableNutrients;
