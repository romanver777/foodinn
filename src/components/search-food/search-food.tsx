import React, { useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { useAppDispatch, TRootState, TAppDispatch } from "../../store/store";
import { fetchFood } from "../../store/food-base-reducer";

import TableBody from "../table-body/table-body";
import crossIcon from "../../style/icons/cross.svg";
import style from "./search-food.module.scss";

import { TFood } from "../../mocks/food";

const getFood = (value: string, list: TFood[]) => {
  const arr = value.split(" ");

  for (let i = 0; i < arr.length; i++) {
    list = list.filter((el) =>
      el.title.toLowerCase().includes(arr[i].toLowerCase())
    );
  }
  return list;
};

type TProps = {
  isOpen: boolean;
};

const SearchFood = ({ isOpen }: TProps) => {
  const [lastFood, setLastFood] = useState<TFood[]>([]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch: TAppDispatch = useAppDispatch();
  const foodList = useSelector((state: TRootState) => state.foodBase.food);
  const loading = useSelector((state: TRootState) => state.foodBase.loading);
  const error = useSelector((state: TRootState) => state.foodBase.error);

  useEffect(() => {
    if (!isOpen) {
      setValue("");
      setLastFood([]);
    }
    if (isOpen && !foodList.length) void dispatch(fetchFood());
  }, [isOpen]);

  useEffect(() => {
    if (value.trim().length > 1) setLastFood(getFood(value, foodList));
    if (value.length === 0) setLastFood([]);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleClickReset = () => {
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <>
      <div className={style.header}>
        <input
          type="search"
          placeholder="Название продукта"
          className={style.input}
          onChange={handleChange}
          value={value}
          ref={inputRef}
        />
        <button className={style["reset-btn"]} onClick={handleClickReset}>
          <img src={crossIcon} className={style["cross-icon"]} />
        </button>
      </div>
      <div className={style.body}>
        {loading && <TableBody food={lastFood} noFoodMessage="Loading..." />}
        {error && <TableBody food={lastFood} noFoodMessage="Error: {error}" />}
        {value.length > 1 && !lastFood.length ? (
          <TableBody food={lastFood} noFoodMessage="Ничего не найдено" />
        ) : (
          ""
        )}
        {!!lastFood.length && <TableBody food={lastFood} noFoodMessage="" />}
      </div>
    </>
  );
};

export default SearchFood;
