import React from "react";

import { useSelector } from "react-redux";
import { getNutrients } from "../../store/selectors";

import CardNutrients from "../card-nutrients/card-nutrients";

import { TCardNutrients } from "../../mocks/mocks-nutrients";

type TProps = {
  date: string;
};

const CardNutrientsList = ({ date }: TProps) => {
  const nutrients = useSelector(getNutrients(date));

  return (
    <>
      {nutrients.map((item: TCardNutrients, ind: number) => (
        <CardNutrients
          title={item.title}
          quantity={item.quantity}
          target={item.target}
          colorInd={ind}
          key={item.title}
        />
      ))}
    </>
  );
};

export default CardNutrientsList;
