import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  clearSelected,
  removeSelected,
  setSelected,
} from "../../store/food-selected-reducer";
import * as selectors from "../../store/selectors";

import TableRow from "../table-row/table-row";
import { TFood } from "../../mocks/food";

type TFoodWeight = {
  id: number;
  weight: number | null;
};

type TProps = {
  food: TFood[];
  foodWeight: TFoodWeight[];
};

const TableMainList = ({ food, foodWeight }: TProps) => {
  const dispatch = useDispatch();
  const meal = useSelector(selectors.getActiveMealItem);
  const allDayMeal = useSelector(selectors.getAllDayMealName);
  const selected = useSelector(selectors.getSelectedItems);

  const getWeight = (id: number) => {
    const result = foodWeight.filter((el) => el.id === id);
    return result[0].weight;
  };

  const handleClick = (food: TFood) => {
    if (meal.toLowerCase() !== allDayMeal.toLowerCase()) {
      if (!selected.length) {
        dispatch(setSelected({ meal, food, weight: null }));
      } else {
        if (selected.filter((item) => item.food.id === food.id).length) {
          dispatch(removeSelected({ meal, food, weight: null }));
        } else {
          dispatch(clearSelected());
          dispatch(setSelected({ meal, food, weight: null }));
        }
      }
    }
  };

  return (
    <>
      {food.map((item: TFood) => {
        let active = false;
        if (selected.filter((el) => el.food.id === item.id).length) {
          active = true;
        } else {
          active = false;
        }
        return (
          <TableRow
            food={item}
            weight={getWeight(item.id)}
            isActive={active}
            onHandleClick={handleClick}
            key={item.id}
            allDayMeal={meal.toLowerCase() === allDayMeal.toLowerCase()}
          />
        );
      })}
    </>
  );
};

export default TableMainList;
