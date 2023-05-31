import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TFood } from "../mocks/food";

type TPayload = {
  meal: string;
  food: TFood;
  weight: number;
};

export interface IFoodSelectedInitialState {
  food: TPayload[];
}

const initialState: IFoodSelectedInitialState = {
  food: [],
};

export const foodSelectedSlice = createSlice({
  name: "food-selected",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<TPayload>) => {
      const currState = JSON.parse(JSON.stringify(state.food)) as TPayload[];

      if (
        !currState.filter(
          (item) =>
            item.food.id === action.payload.food.id &&
            item.meal === action.payload.meal
        ).length
      ) {
        state.food.push(action.payload);
      }
    },
    setWeightSelected: (state, action: PayloadAction<number>) => {
      state.food[0] = {
        meal: state.food[0].meal,
        food: state.food[0].food,
        weight: action.payload,
      };
    },
    removeSelected: (state, action: PayloadAction<TPayload>) => {
      const currState = JSON.parse(JSON.stringify(state.food)) as TPayload[];

      state.food = currState.filter(
        (item) =>
          item.meal === action.payload.meal &&
          item.food.id !== action.payload.food.id
      );
    },
    clearSelected: (state) => {
      state.food = [];
    },
  },
});

export const { setSelected, removeSelected, setWeightSelected, clearSelected } =
  foodSelectedSlice.actions;
export default foodSelectedSlice.reducer;
