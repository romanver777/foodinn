import React from "react";

import { useSelector } from "react-redux";
import { TRootState } from "../../store/store";

import CardNutrients from "../card-nutrients/card-nutrients";

import { TCardNutrients } from "../../mocks/mocks-nutrients";
import { TFood } from "../../mocks/food";

type TProps = {
  date: string;
};

const CardNutrientsList = ({ date }: TProps) => {
  const dayFood = useSelector((state: TRootState) => {
    const allFood = state.foodDays.days.filter((item) => item.date === date);
    if (allFood.length) {
      const res = [] as TFood[];
      const uniqIds = new Set([...allFood[0].dayFood.map((el) => el.food.id)]);

      Array.from(uniqIds).forEach((id) => {
        const itemById = allFood[0].dayFood.find(
          (item) => item.food.id === id
        )?.food;

        if (itemById !== undefined) res.push(itemById);
      });

      return res;
    }
    return [];
  });
  const dayFoodWeight = useSelector((state: TRootState) => {
    const result = state.foodDays.days.filter((el) => el.date === date);
    if (result.length) {
      const res = [] as { id: number; weight: number }[];
      const uniqIds = new Set([...result[0].dayFood.map((el) => el.food.id)]);

      Array.from(uniqIds).forEach((id) => {
        const itemByIdWeight = result[0].dayFood
          .filter((item) => item.food.id === id)
          .reduce((a, el) => {
            const weight = el.weight ? el.weight : 0;
            return a + weight;
          }, 0);
        res.push({ id, weight: itemByIdWeight });
      });
      return res;
    }
    return [];
  });
  const getNutrients = (
    dayFood: TFood[],
    dayFoodWeight: { id: number; weight: number }[]
  ) => {
    const nutr = [] as { prot: number; fat: number; carbs: number }[];
    dayFoodWeight.forEach((el) => {
      const foodItem = dayFood.find((item) => item.id === el.id);
      if (foodItem) {
        const prot = (foodItem.prot * el.weight) / foodItem.portion;
        const fat = (foodItem.fat * el.weight) / foodItem.portion;
        const carbs = (foodItem.carbs * el.weight) / foodItem.portion;
        nutr.push({ prot, fat, carbs });
      }
    });

    const protAll = +nutr.reduce((a, n) => a + n.prot, 0).toFixed();
    const fatAll = +nutr.reduce((a, n) => a + n.fat, 0).toFixed();
    const carbsAll = +nutr.reduce((a, n) => a + n.carbs, 0).toFixed();
    const kkal = (protAll + carbsAll) * 4 + fatAll * 9;

    return [
      {
        title: "Белки",
        quantity: protAll,
        target: 160,
      },
      {
        title: "Жиры",
        quantity: fatAll,
        target: 60,
      },
      {
        title: "Углеводы",
        quantity: carbsAll,
        target: 100,
      },
      {
        title: "Ккал",
        quantity: kkal,
        target: 1420,
      },
    ];
  };

  return (
    <>
      {getNutrients(dayFood, dayFoodWeight).map(
        (item: TCardNutrients, ind: number) => (
          <CardNutrients
            title={item.title}
            quantity={item.quantity}
            target={item.target}
            colorInd={ind}
            key={item.title}
          />
        )
      )}
    </>
  );
};

export default CardNutrientsList;
