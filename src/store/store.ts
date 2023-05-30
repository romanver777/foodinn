import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { listenerMiddleware } from "./local-storage-middleware";

import foodBaseReducer from "./food-base-reducer";
import mealReducer from "./meal-reducer";
import foodSelectedReducer from "./food-selected-reducer";
import foodDaysReducer, { IFoodDaysInitialState } from "./food-days-reducer";

const localState = JSON.parse(
  localStorage.getItem("days") || "null"
) as IFoodDaysInitialState;

export const store = configureStore({
  preloadedState: {
    foodDays: localState === null ? { days: [] } : localState,
  },
  reducer: {
    foodBase: foodBaseReducer,
    meal: mealReducer,
    foodSelected: foodSelectedReducer,
    foodDays: foodDaysReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<TAppDispatch>();
