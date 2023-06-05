import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "./store";
import { TFood } from "../mocks/food";
import { TMealFood } from "./food-days-reducer";

const sortByTitle = (a: TFood, b: TFood) => {
  if (a.title > b.title) return 1;
  if (a.title < b.title) return -1;
  return 0;
};

const getAllDaysItems = (state: TRootState) => state.foodDays.days;

export const getDayItemByDate = (date: string) =>
  createSelector(getAllDaysItems, (items) =>
    items.filter((item) => item.date === date)
  );

export const getSelectedItems = (state: TRootState) => state.foodSelected.food;

export const getWeightOfSingleSelected = createSelector(
  getSelectedItems,
  (items) => (items.length ? items[0].weight : 0)
);

export const getCurrentMeal = (state: TRootState) => state.meal.activeMeal;
export const getAllDayMealName = (state: TRootState) =>
  state.meal.mealsList[state.meal.mealsList.length - 1];

export const getAllDayUniqFood = (date: string) =>
  createSelector(getDayItemByDate(date), (items) => {
    if (items.length) {
      const allItems = items[0].dayFood;
      const result = [] as TFood[];
      const uniqIds = new Set([
        ...allItems.map((item: TMealFood) => item.food.id),
      ]);

      Array.from(uniqIds).forEach((id) => {
        const itemById = allItems.find((item) => item.food.id === id)?.food;

        if (itemById !== undefined) result.push(itemById);
      });

      return result;
    }
    return [];
  });

export const getDayFoodByMeal = (date: string) =>
  createSelector(
    getDayItemByDate(date),
    getAllDayUniqFood(date),
    getCurrentMeal,
    getAllDayMealName,
    (day, uniqItems, meal, allDayName) => {
      if (day.length) {
        const allDayFood = day[0].dayFood;

        if (meal.toLowerCase() === allDayName.toLowerCase()) {
          return uniqItems.sort(sortByTitle);
        }
        return allDayFood
          .filter((item) => item.meal === meal)
          .map((el) => el.food)
          .sort(sortByTitle);
      }
      return [];
    }
  );

export const getDayUniqFoodWeight = (date: string) =>
  createSelector(getDayItemByDate(date), (item) => {
    if (item.length) {
      const items = item[0].dayFood;
      const result = [] as { id: number; weight: number }[];
      const uniqIds = new Set([...items.map((el) => el.food.id)]);

      Array.from(uniqIds).forEach((id) => {
        const itemByIdWeight = items
          .filter((item) => item.food.id === id)
          .reduce((a, el) => {
            const weight = el.weight ? el.weight : 0;
            return a + weight;
          }, 0);
        result.push({ id, weight: itemByIdWeight });
      });
      return result;
    }
    return [];
  });

export const getDayFoodWeight = (date: string) =>
  createSelector(
    getDayItemByDate(date),
    getDayUniqFoodWeight(date),
    getCurrentMeal,
    getAllDayMealName,
    (day, uniqWeight, meal, allDayName) => {
      if (day.length) {
        const allDayFood = day[0].dayFood;

        if (meal.toLowerCase() === allDayName.toLowerCase()) {
          return uniqWeight;
        }
        return allDayFood
          .filter((item) => item.meal === meal)
          .map((el) => {
            return { id: el.food.id, weight: el.weight };
          });
      }
      return undefined;
    }
  );

export const getMealList = (state: TRootState) => state.meal.mealsList;
export const getActiveMealItem = (state: TRootState) => state.meal.activeMeal;

export const getNutrients = (date: string) =>
  createSelector(
    getAllDayUniqFood(date),
    getDayUniqFoodWeight(date),
    (food, weight) => {
      const nutr = [] as { prot: number; fat: number; carbs: number }[];
      weight.forEach((el) => {
        const foodItem = food.find((item) => item.id === el.id);
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
    }
  );
