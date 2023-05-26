import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TActiveMeal = "Завтрак" | "Обед" | "Ужин" | "Перекус" | "Весь день";

export interface IMealInitialState {
  mealsList: string[];
  activeMeal: string;
}

const initialState: IMealInitialState = {
  mealsList: ["Завтрак", "Обед", "Ужин", "Перекус", "Весь день"],
  activeMeal: "Завтрак",
};

export const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    setMeal: (state, action: PayloadAction<string>) => {
      state.activeMeal = action.payload;
    },
  },
});

export const { setMeal } = mealSlice.actions;
export default mealSlice.reducer;
