import React from "react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { render, screen, fireEvent } from "@testing-library/react";
import MealList from "./meal-list";

describe("MealList", () => {
  const mealList = ["Завтрак", "Обед", "Ужин", "Перекус", "Весь день"];

  beforeEach(() => {
    render(
      <Provider store={store}>
        <MealList />
      </Provider>
    );
  });

  it("renders correctly with buttons length = 5", () => {
    const btns = screen.getAllByRole("button");
    expect(btns.length).toEqual(5);
  });

  it("renders all meals from MealList", () => {
    mealList.forEach((item: string) => {
      const text = screen.getByRole("button", { name: item });
      expect(text).toBeVisible();
    });
  });

  it("renders first button with className={meal-item_active} and change className to clicked button", () => {
    const btns = screen.getAllByRole("button");

    btns.forEach((btn, i) => {
      i === 0
        ? expect(btn).toHaveClass("meal-item_active")
        : expect(btn).not.toHaveClass("meal-item_active");
    });

    fireEvent.click(btns[2]);

    btns.forEach((btn, i) => {
      i === 2
        ? expect(btn).toHaveClass("meal-item_active")
        : expect(btn).not.toHaveClass("meal-item_active");
    });

    fireEvent.click(btns[3]);

    btns.forEach((btn, i) => {
      i === 3
        ? expect(btn).toHaveClass("meal-item_active")
        : expect(btn).not.toHaveClass("meal-item_active");
    });
  });
});
