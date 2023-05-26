import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import { setDayFood } from "../../store/food-days-reducer";
import { clearSelected } from "../../store/food-selected-reducer";

import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

import Card from "../card/card";
import CardNutrientsList from "../card-nutrients-list/card-nutrients-list";
import TableNutrients from "../table-nutrients/table-nutrients";
import SearchFood from "../search-food/search-food";

import style from "./main-page.module.scss";

const MainPage = () => {
  const [date, setDate] = useState(new Date());
  const [dpOpen, setDpOpen] = useState(false);
  const [isFlip, setIsFlip] = useState(false);

  const getFormatDate = (date: Date) =>
    date.toLocaleString("default", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

  const dispatch = useDispatch();
  const selected = useSelector((state: TRootState) => state.foodSelected.food);
  const meal = useSelector((state: TRootState) => state.meal.activeMeal);
  const dayFood = useSelector((state: TRootState) => {
    const result = state.foodDays.days.filter(
      (el) => el.date === getFormatDate(date)
    );
    if (result.length)
      return result[0].dayFood
        .filter((item) => item.meal === meal)
        .map((el) => el.food);
    return [];
  });

  const styleRow = dpOpen ? style.row + " " + style["row_slide"] : style.row;
  const styleFront = isFlip
    ? style.front + " " + style["front_flip"]
    : style.front;
  const styleBack = isFlip ? style.back + " " + style["back_flip"] : style.back;

  const handleDate = (date: Date) => {
    setDate(date);
    setDpOpen(!dpOpen);
  };

  const handleClick = () => {
    if (window.innerWidth <= 768) setDpOpen(!dpOpen);
  };
  const handleFlip = () => {
    if (isFlip && selected.length) dispatch(clearSelected());
    setIsFlip(!isFlip);
  };
  const handleClickAddProds = () => {
    if (selected.length) {
      dispatch(
        setDayFood({
          date: getFormatDate(date),
          dayFood: selected,
        })
      );
      handleFlip();
    }
  };

  return (
    <>
      <div className={style.row}>
        <CardNutrientsList />
      </div>
      <div className={styleRow}>
        <div className={style.column + " " + style["column-nutrie"]}>
          <div className={style.flip}>
            <div className={styleFront}>
              <Card isCol={true} newClass="_flip">
                <TableNutrients
                  food={dayFood}
                  date={date}
                  onHandleClick={() => handleClick()}
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
              />
            </div>
          </Card>
        </div>
      </div>
      <div className={style.row + " " + style["row-btn"]}>
        <button
          className={style.btn + " " + style["btn_back"]}
          onClick={handleFlip}
        >
          {isFlip ? <span>&lt;</span> : "Добавить продукты"}
        </button>
        {isFlip && (
          <button className={style.btn} onClick={handleClickAddProds}>
            Добавить продукты
            {!!selected.length && (
              <div className={style.products}>{selected.length}</div>
            )}
          </button>
        )}
      </div>
    </>
  );
};

export default MainPage;
