import React, { useState } from "react";

import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

import Card from "../card/card";
import CardNutrientsList from "../card-nutrients-list/card-nutrients-list";
import TableNutrients from "../table-nutrients/table-nutrients";

import style from "./main-page.module.scss";
import { foodTable } from "../../mocks/food-table";

const MainPage = () => {
  const [date, setDate] = useState(new Date());
  const [dpOpen, setDpOpen] = useState(false);

  const styleRow = dpOpen ? style.row + " " + style["row_slide"] : style.row;

  const handleDate = (date: Date) => {
    setDate(date);
    setDpOpen(!dpOpen);
  };
  const handleClick = () => {
    if (window.innerWidth <= 768) setDpOpen(!dpOpen);
  };

  return (
    <>
      <div className={style.row}>
        <CardNutrientsList />
      </div>
      <div className={styleRow}>
        <div className={style.column + " " + style["column-nutrie"]}>
          <Card isCol={true}>
            <TableNutrients
              food={foodTable}
              date={date}
              onHandleClick={() => handleClick()}
            />
          </Card>
        </div>
        <div
          className={
            style.column + " " + style["column_fg"] + " " + style["column-dp"]
          }
        >
          <Card isCol={true}>
            <DatePicker
              selected={date}
              onChange={(date: Date) => handleDate(date)}
              wrapperClassName={style.datepicker}
              dateFormat="dd.MM"
              locale={ru}
              inline
            />
          </Card>
        </div>
      </div>
      <div className={style.row + " " + style["row-btn"]}>
        <button className={style.btn}>Добавить продукт</button>
      </div>
    </>
  );
};

export default MainPage;
