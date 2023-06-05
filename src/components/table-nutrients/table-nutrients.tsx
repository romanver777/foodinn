import React from "react";

import TableBody from "../table-body/table-body";
import MealList from "../meal-list/meal-list";
import style from "./table-nutrients.module.scss";

import { TFood } from "../../mocks/food";

const addName = (dayNumber: number) => {
  const names = ["Вчера", "Сегодня", "Завтра"];
  const newDate = new Date();
  if (dayNumber === newDate.getDate()) return `, ${names[1]}`;
  if (dayNumber === newDate.getDate() - 1) return `, ${names[0]}`;
  if (dayNumber === newDate.getDate() + 1) return `, ${names[2]}`;

  return "";
};

const getFormatDate = (date: Date) => {
  const mNum = date.getMonth() + 1;
  const mWord = date.toLocaleString("default", { month: "long" });
  const mEndLetters = ["а", "я"];
  const day = date.toLocaleString("default", { day: "numeric" });

  if (mNum === 3 || mNum === 8) {
    return (
      `${day} ${mWord}${mEndLetters[0]}`.toUpperCase() + `${addName(+day)}`
    );
  }
  return (
    `${day} ${mWord.slice(0, -1)}${mEndLetters[1]}`.toUpperCase() +
    `${addName(+day)}`
  );
};

type TFoodWeight = {
  id: number;
  weight: number | null;
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
          {getFormatDate(date)}
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
