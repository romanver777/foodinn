import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import foodBaseReducer from "./food-base-reducer";
import mealReducer from "./meal-reducer";
import foodSelectedReducer from "./food-selected-reducer";
import foodDaysReducer from "./food-days-reducer";

export const store = configureStore({
  reducer: {
    foodBase: foodBaseReducer,
    meal: mealReducer,
    foodSelected: foodSelectedReducer,
    foodDays: foodDaysReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<TAppDispatch>();
