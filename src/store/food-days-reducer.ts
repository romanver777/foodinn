import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TFood } from "../mocks/food";

type TMealFood = {
  meal: string;
  food: TFood;
};

type TDayFood = {
  date: string;
  dayFood: TMealFood[];
};

export interface IFoodDaysInitialState {
  days: TDayFood[];
}

const initialState: IFoodDaysInitialState = {
  days: [],
};

export const foodDaySlice = createSlice({
  name: "foodDay",
  initialState,
  reducers: {
    setDayFood: (state, action: PayloadAction<TDayFood>) => {
      const currState = JSON.parse(JSON.stringify(state.days)) as TDayFood[];

      const currentDateStateArray = currState.filter(
        (el) => el.date === action.payload.date
      );
      let result = [] as TMealFood[];

      if (currentDateStateArray.length) {
        const allCurrentMealArr = [
          ...currentDateStateArray[0].dayFood.filter(
            (el) => el.meal === action.payload.dayFood[0].meal
          ),
          ...action.payload.dayFood,
        ];
        const otherMealArr = [
          ...currentDateStateArray[0].dayFood.filter(
            (el) => el.meal !== action.payload.dayFood[0].meal
          ),
        ];

        if (allCurrentMealArr.length !== action.payload.dayFood.length) {
          const allCurrentMealFiltered = [] as TMealFood[];
          const set = new Set(allCurrentMealArr.map((el) => el.food.id));

          Array.from(set).forEach((el) => {
            allCurrentMealFiltered.push(
              allCurrentMealArr.find((it) => it.food.id === el)!
            );
          });

          result = [...otherMealArr, ...allCurrentMealFiltered];
        } else {
          result = [...allCurrentMealArr, ...otherMealArr];
        }

        currentDateStateArray[0].dayFood = [...result];

        state.days = state.days.filter((el) => el.date !== action.payload.date);
        state.days.push(currentDateStateArray[0]);
      } else {
        state.days.push(action.payload);
      }
    },
  },
});

export const { setDayFood } = foodDaySlice.actions;
export default foodDaySlice.reducer;
