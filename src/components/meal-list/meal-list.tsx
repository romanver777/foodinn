import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setMeal } from "../../store/meal-reducer";
import * as selectors from "../../store/selectors";

import style from "./meal-list.module.scss";

const MealList = () => {
  const dispatch = useDispatch();
  const list = useSelector(selectors.getMealList);
  const activeItem = useSelector(selectors.getActiveMealItem);

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
