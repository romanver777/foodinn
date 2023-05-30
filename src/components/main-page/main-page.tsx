import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import { setDayFood, removeDayFood } from "../../store/food-days-reducer";
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
import { TFood } from "../../mocks/food";

const sortByTitle = (a: TFood, b: TFood) => {
  if (a.title > b.title) return 1;
  if (a.title < b.title) return -1;
  return 0;
};

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
  const selected = useSelector((state: TRootState) => {
    return state.foodSelected.food;
  });
  const meal = useSelector((state: TRootState) => {
    return state.meal.activeMeal;
  });
  const dayFood = useSelector((state: TRootState) => {
    const result = state.foodDays.days.filter(
      (el) => el.date === getFormatDate(date)
    );
    if (result.length) {
      if (meal.toLowerCase() === "весь день") {
        const res = [] as TFood[];
        const uniqIds = new Set([...result[0].dayFood.map((el) => el.food.id)]);

        Array.from(uniqIds).forEach((id) => {
          const itemById = result[0].dayFood.find(
            (item) => item.food.id === id
          )?.food;

          if (itemById !== undefined) res.push(itemById);
        });

        return res.sort(sortByTitle);
      }
      return result[0].dayFood
        .filter((item) => item.meal === meal)
        .map((el) => el.food)
        .sort(sortByTitle);
    }
    return [];
  });
  const dayFoodWeight = useSelector((state: TRootState) => {
    const result = state.foodDays.days.filter(
      (el) => el.date === getFormatDate(date)
    );
    if (result.length) {
      if (meal.toLowerCase() === "весь день") {
        const res = [] as { id: number; weight: number }[];
        const uniqIds = new Set([...result[0].dayFood.map((el) => el.food.id)]);

        Array.from(uniqIds).forEach((id) => {
          const itemByIdWeight = result[0].dayFood
            .filter((item) => item.food.id === id)
            .reduce((a, el) => a + el.weight, 0);
          res.push({ id, weight: itemByIdWeight });
        });
        return res;
      }
      return result[0].dayFood
        .filter((item) => item.meal === meal)
        .map((el) => {
          return { id: el.food.id, weight: el.weight };
        });
    }
    return undefined;
  });

  const styleRow = dpOpen ? style.row + " " + style["row_slide"] : style.row;
  const styleFront = isFlip
    ? style.front + " " + style["front_flip"]
    : style.front;
  const styleBack = isFlip ? style.back + " " + style["back_flip"] : style.back;

  useEffect(() => {
    dispatch(clearSelected());
  }, [meal, dpOpen]);

  const handleDate = (date: Date) => {
    setDate(date);
    setDpOpen(!dpOpen);
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
          </>
        ) : null}
      </div>
    </>
  );
};

export default MainPage;
