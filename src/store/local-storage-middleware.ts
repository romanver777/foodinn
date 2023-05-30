import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { removeDayFood, setDayFood } from "./food-days-reducer";
import { TRootState } from "./store";

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(setDayFood, removeDayFood),
  effect: (action, listenerApi) => {
    localStorage.setItem(
      "days",
      JSON.stringify((listenerApi.getState() as TRootState).foodDays)
    );
  },
});
