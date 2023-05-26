import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import { setSelected, removeSelected } from "../../store/food-selected-reducer";

import style from "./table-row.module.scss";
import { TFood } from "../../mocks/food";

type TProps = {
  food: TFood;
  key: string;
};

const TableRow = (props: TProps) => {
  const { food } = props;
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const meal = useSelector((state: TRootState) => state.meal.activeMeal);

  const kkal = (food.prot + food.carbs) * 4 + food.fat * 9;

  const styleTr = active ? style.tr + " " + style["tr_active"] : style.tr;

  const handleClick = () => {
    if (!active) {
      dispatch(setSelected({ meal, food }));
    } else {
      dispatch(removeSelected({ meal, food }));
    }
    setActive(!active);
  };

  return (
    <tr className={styleTr} onClick={handleClick}>
      <td className={style.td}>
        <div className={style["td-title"]}>{food.title}</div>
        <table>
          <tbody>
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
          </tbody>
        </table>
      </td>
      <td className={style.td}>
        <div className={style["weight-wrapper"]}>
          <div className={style.weight}>
            {food.portion}
            {food.measure}
          </div>
          <div className={style.kkal}>{kkal}ккал</div>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
