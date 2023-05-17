import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import style from "./card-nutrients.module.scss";
import { colorsCard, colorDefault } from "../../constants/const";

ChartJS.register(ArcElement);

type TProps = {
  title: string;
  quantity: number;
  target: number;
  colorInd: number;
  key: string;
};

const CardNutrients = ({ title, quantity, target, colorInd }: TProps) => {
  const [currentQuant, setCurrentQuant] = useState(0);
  const timeout = 100 + 100 * (colorInd + 1);

  useEffect(() => {
    setTimeout(() => setCurrentQuant(quantity), timeout);
  }, [quantity]);

  const deficit = currentQuant < target ? target - currentQuant : null;

  const chartData = {
    labels: [currentQuant, deficit],
    datasets: [
      {
        label: title,
        data: [currentQuant, deficit],
        backgroundColor: [colorsCard[colorInd], colorDefault],
        hoverOffset: 0.3,
      },
    ],
  };

  return (
    <div className={style.card}>
      <div className={style.wrapper}>
        <div className={style.chart}>
          <Doughnut data={chartData} />
        </div>
        <div className={style.body}>
          <div className={style.title}>{title}</div>
          <div
            className={
              style.quantity + " " + style[`quantity_color${colorInd + 1}`]
            }
          >
            {quantity}
          </div>
          <div className={style.target}>{target}</div>
        </div>
      </div>
    </div>
  );
};

export default CardNutrients;
