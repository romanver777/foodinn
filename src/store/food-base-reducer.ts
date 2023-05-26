import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TFood } from "../mocks/food";

export const fetchFood = createAsyncThunk<
  TFood[],
  void,
  {
    rejectValue: string;
  }
>("food/fetchFood", async (_, thunkApi) => {
  try {
    const response = await fetch(
      "https://run.mocky.io/v3/7758aaf6-044f-4af3-b4f5-1f5d97acddc8"
    );
    return response.json();
  } catch (error) {
    return thunkApi.rejectWithValue("failed to fetch food");
  }
});

export interface IFoodInitialState {
  food: TFood[];
  loading: boolean;
  error: string | null;
}

const initialState: IFoodInitialState = {
  food: [],
  loading: false,
  error: null,
};

export const foodFetchSlice = createSlice({
  name: "food-fetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFood.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFood.fulfilled, (state, action) => {
        state.loading = false;
        state.food = action.payload;
      })
      .addCase(fetchFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "sfgagagafdgafg";
      });
  },
});

export default foodFetchSlice.reducer;
