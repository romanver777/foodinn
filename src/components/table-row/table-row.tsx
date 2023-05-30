import React from "react";

import style from "./table-row.module.scss";
import { TFood } from "../../mocks/food";

type TProps = {
  food: TFood;
  weight?: number;
  isActive: boolean;
  onHandleClick: (food: TFood) => void;
  allDayMeal: boolean;
  key: number;
};

const TableRow = ({
  food,
  weight,
  isActive,
  onHandleClick,
  allDayMeal,
}: TProps) => {
  const getKkal = (p: number, f: number, c: number) => (p + c) * 4 + f * 9;
  const foodWeight = weight === undefined ? food.portion : weight;
  const prot =
    weight === undefined ? food.prot : (foodWeight * food.prot) / food.portion;
  const fat =
    weight === undefined ? food.fat : (foodWeight * food.fat) / food.portion;
  const carbs =
    weight === undefined
      ? food.carbs
      : (foodWeight * food.carbs) / food.portion;
  const kkal = getKkal(prot, fat, carbs);

  let styleTr = isActive ? style.tr + " " + style["tr_active"] : style.tr;
  styleTr = allDayMeal ? style.tr + " " + style["tr_cursordefault"] : styleTr;

  return (
    <tr className={styleTr} onClick={() => onHandleClick(food)}>
      <td className={style.td}>
        <div className={style["td-title"]}>{food.title}</div>
        <table>
          <tbody>
            <tr className={style["bgy-list"]}>
              <td className={style["bgy-item"] + " " + style["bgy-prot"]}>
                {prot}
              </td>
              <td className={style["bgy-item"] + " " + style["bgy-fat"]}>
                {fat}
              </td>
              <td className={style["bgy-item"] + " " + style["bgy-carbs"]}>
                {carbs}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      <td className={style.td}>
        <div className={style["weight-wrapper"]}>
          <div className={style.weight}>
            {foodWeight}
            {food.measure}
          </div>
          <div className={style.kkal}>{kkal}ккал</div>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
