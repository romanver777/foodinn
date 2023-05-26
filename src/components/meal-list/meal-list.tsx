import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import { setMeal } from "../../store/meal-reducer";

import style from "./meal-list.module.scss";

const MealList = () => {
  const dispatch = useDispatch();
  const list = useSelector((state: TRootState) => state.meal.mealsList);
  const activeItem = useSelector((state: TRootState) => state.meal.activeMeal);

  return (
    <div className={style["meal-list"]}>
      {list.map((item) => {
        const styleItem =
          item === activeItem
            ? style["meal-item"] + " " + style["meal-item_active"]
            : item === list[list.indexOf(activeItem) - 1]
            ? style["meal-item"] + " " + style["meal-item_before"]
            : style["meal-item"];

        return (
          <button
            className={styleItem}
            key={item}
            onClick={() => dispatch(setMeal(item))}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default MealList;
