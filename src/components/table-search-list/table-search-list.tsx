import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import { setSelected, removeSelected } from "../../store/food-selected-reducer";

import TableRow from "../table-row/table-row";
import { TFood } from "../../mocks/food";

type TProps = {
  food: TFood[];
};

const TableSearchList = ({ food }: TProps) => {
  const dispatch = useDispatch();
  const meal = useSelector((state: TRootState) => state.meal.activeMeal);
  const selected = useSelector((state: TRootState) => state.foodSelected.food);

  const handleClick = (food: TFood) => {
    if (selected.filter((item) => item.food.id === food.id).length) {
      dispatch(removeSelected({ meal, food, weight: 0 }));
    } else {
      dispatch(setSelected({ meal, food, weight: 0 }));
    }
  };

  return (
    <>
      {food.map((item) => {
        let active = false;
        if (selected.filter((el) => el.food.id === item.id).length) {
          active = true;
        } else {
          active = false;
        }
        return (
          <TableRow
            food={item}
            isActive={active}
            onHandleClick={handleClick}
            key={item.id}
            allDayMeal={false}
          />
        );
      })}
    </>
  );
};

export default TableSearchList;
