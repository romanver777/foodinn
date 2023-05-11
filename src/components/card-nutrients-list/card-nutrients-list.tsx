import React from "react";

import CardNutrients from "../card-nutrients/card-nutrients";

import nutrients, { TCardNutrients } from "../../mocks/mocks-nutrients";

const CardNutrientsList = () => {
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
