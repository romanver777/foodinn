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

export const getDayFoodByMeal = (date: string) =>
  createSelector(
    getDayItemByDate(date),
    getCurrentMeal,
    getAllDayMealName,
    (day, meal, allDayName) => {
      if (day.length) {
        const allDayFood = day[0].dayFood;

        if (meal.toLowerCase() === allDayName.toLowerCase()) {
          const result = [] as TFood[];
          const uniqIds = new Set([
            ...allDayFood.map((item: TMealFood) => item.food.id),
          ]);

          Array.from(uniqIds).forEach((id) => {
            const itemById = allDayFood.find(
              (item) => item.food.id === id
            )?.food;

            if (itemById !== undefined) result.push(itemById);
          });

          return result.sort(sortByTitle);
        }
        return allDayFood
          .filter((item) => item.meal === meal)
          .map((el) => el.food)
          .sort(sortByTitle);
      }
      return [];
    }
  );

export const getDayFoodWeight = (date: string) =>
  createSelector(
    getDayItemByDate(date),
    getCurrentMeal,
    getAllDayMealName,
    (day, meal, allDayName) => {
      if (day.length) {
        const allDayFood = day[0].dayFood;

        if (meal.toLowerCase() === allDayName.toLowerCase()) {
          const result = [] as { id: number; weight: number }[];
          const uniqIds = new Set([...allDayFood.map((item) => item.food.id)]);

          Array.from(uniqIds).forEach((id) => {
            const weightById = allDayFood
              .filter((item) => item.food.id === id)
              .reduce((a, el) => a + el.weight, 0);

            result.push({ id, weight: weightById });
          });
          return result;
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
