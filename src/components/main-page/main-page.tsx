import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setDayFood, removeDayFood } from "../../store/food-days-reducer";
import {
  clearSelected,
  setWeightSelected,
} from "../../store/food-selected-reducer";
import { setDefaultMeal } from "../../store/meal-reducer";
import * as selectors from "../../store/selectors";

import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

import Card from "../card/card";
import CardNutrientsList from "../card-nutrients-list/card-nutrients-list";
import TableNutrients from "../table-nutrients/table-nutrients";
import SearchFood from "../search-food/search-food";

import style from "./main-page.module.scss";

const getFormatDate = (date: Date) =>
  date.toLocaleString("default", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

const MainPage = () => {
  const [date, setDate] = useState(new Date());
  const [dpOpen, setDpOpen] = useState(false);
  const [isFlip, setIsFlip] = useState(false);
  const [value, setValue] = useState<number | string>("0");

  const dispatch = useDispatch();
  const selected = useSelector(selectors.getSelectedItems);
  const selectedWeight = useSelector(selectors.getWeightOfSingleSelected);
  const meal = useSelector(selectors.getCurrentMeal);
  const dayFood = useSelector(selectors.getDayFoodByMeal(getFormatDate(date)));
  const dayFoodWeight = useSelector(
    selectors.getDayFoodWeight(getFormatDate(date))
  );
  const daysDates = useSelector(selectors.getDates(date));

  useEffect(() => {
    void dispatch(setDefaultMeal());
  }, [date]);

  useEffect(() => {
    dispatch(clearSelected());
  }, [meal, dpOpen]);

  useEffect(() => {
    if (selected.length && selected[0].weight !== null) {
      dispatch(removeDayFood({ date: getFormatDate(date), food: selected }));
      dispatch(setDayFood({ date: getFormatDate(date), dayFood: selected }));
      dispatch(clearSelected());
      setValue("");
    }
  }, [selectedWeight]);

  const handleDate = (date: Date) => {
    setDate(date);
    setDpOpen(false);
  };
  const handleDateClick = () => {
    if (window.innerWidth <= 768) setDpOpen(!dpOpen);
  };
  const handleButtonClick = () => {
    if (isFlip && selected.length) dispatch(clearSelected());
    if (!isFlip && selected.length) dispatch(clearSelected());
    if (dpOpen) {
      handleDateClick();
    } else if (isFlip) {
      setIsFlip(!isFlip);
    }
  };
  const handleClickAddProds = () => {
    if (selected.length) {
      dispatch(
        setDayFood({
          date: getFormatDate(date),
          dayFood: selected,
        })
      );
      dispatch(clearSelected());
    }
    setIsFlip(!isFlip);
  };
  const handleDeleteClick = () => {
    dispatch(removeDayFood({ date: getFormatDate(date), food: selected }));
    dispatch(clearSelected());
  };
  const handleChangeWeightClick = () => {
    if (value) {
      dispatch(setWeightSelected(+value));
    }
  };
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleChangeWeightClick();
  };

  const styleRow = dpOpen ? style.row + " " + style["row_slide"] : style.row;
  const styleFront = isFlip
    ? style.front + " " + style["front_flip"]
    : style.front;
  const styleBack = isFlip ? style.back + " " + style["back_flip"] : style.back;

  return (
    <>
      <div className={style.row}>
        <CardNutrientsList date={getFormatDate(date)} />
      </div>
      <div className={styleRow}>
        <div className={style.column + " " + style["column-nutrie"]}>
          <div className={style.flip}>
            <div className={styleFront}>
              <Card isCol={true} newClass="_flip">
                <TableNutrients
                  food={dayFood}
                  foodWeight={dayFoodWeight}
                  date={date}
                  onHandleClick={() => handleDateClick()}
                />
              </Card>
            </div>
            <div className={styleBack}>
              <Card isCol={true} newClass="_flip">
                <SearchFood isOpen={isFlip} />
              </Card>
            </div>
          </div>
        </div>
        <div
          className={
            style.column + " " + style["column_fg"] + " " + style["column-dp"]
          }
        >
          <Card isCol={true}>
            <div className={style["datepicker-wrapper"]}>
              <DatePicker
                selected={date}
                onChange={(date: Date) => handleDate(date)}
                wrapperClassName={style.datepicker}
                dateFormat="dd.MM"
                locale={ru}
                inline
                highlightDates={daysDates}
              />
            </div>
          </Card>
        </div>
      </div>
      <div className={style.row + " " + style["row-btn"]}>
        {isFlip || dpOpen ? (
          <button
            className={style.btn + " " + style["btn_back"]}
            onClick={handleButtonClick}
          >
            Назад
          </button>
        ) : null}
        {isFlip == false &&
        selected.length == 0 &&
        dpOpen == false &&
        meal.toLowerCase() !== "весь день" ? (
          <button
            className={style.btn + " " + style["btn_back"]}
            onClick={handleClickAddProds}
          >
            Добавить продукты
          </button>
        ) : null}

        {isFlip && !!selected.length && (
          <button className={style.btn} onClick={handleClickAddProds}>
            Добавить продукты
            <div className={style.products}>{selected.length}</div>
          </button>
        )}
        {isFlip == false &&
        selected.length > 0 &&
        meal.toLowerCase() !== "весь день" ? (
          <>
            <button
              className={style.btn + " " + style["btn_back"]}
              onClick={handleButtonClick}
            >
              Назад
            </button>
            <button
              className={`${style.btn} ${style["btn-weight"]}`}
              onClick={handleDeleteClick}
            >
              Удалить
            </button>
            <button
              className={`${style.btn} ${style["btn-weight"]}`}
              onClick={handleChangeWeightClick}
            >
              Изменить вес
              <form onSubmit={handleForm} className={style.form}>
                <input
                  type="number"
                  name="weight"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onFocus={() => setValue("")}
                  className={style.in}
                />
              </form>
            </button>
          </>
        ) : null}
      </div>
    </>
  );
};

export default MainPage;
