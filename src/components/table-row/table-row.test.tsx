import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TableRow, { TProps, getFixed, getKkal } from "./table-row";

describe("function getFixed", () => {
  const numbers = [12, 15.95, 9.2, 9.01, 11.16, 11.49];
  const result = [12, 15.9, 9.2, 9, 11.2, 11.5];

  it("with numbers = result elems", () => {
    numbers.forEach((n, i) => {
      expect(getFixed(n)).toEqual(result[i]);
    });
  });
});
describe("function getKkal", () => {
  const num1 = [10, 58, 222.3];
  const num2 = [51, 14.8, 72];
  const num3 = [22.3, 98.7, 65.1];
  const result = [588.2, 760, 1797.6];

  it("with params = result elems", () => {
    num1.forEach((n, i) => {
      expect(getKkal(n, num2[i], num3[i])).toEqual(result[i]);
    });
  });
});
describe("TableRow", () => {
  const props: TProps = {
    food: {
      id: 0,
      title: "Куриная грудка",
      prot: 23.6,
      fat: 1.9,
      carbs: 0.4,
      portion: 100,
      measure: "гр",
    },
    weight: undefined,
    isActive: false,
    onHandleClick: jest.fn(),
    allDayMeal: false,
    key: 0,
  };
  it("renders with default props ", () => {
    const { title, prot, fat, carbs, measure, portion } = props.food;
    const { container } = render(
      <table>
        <tbody>
          <TableRow {...props} />
        </tbody>
      </table>
    );

    expect(screen.getByText(title)).toBeVisible();
    expect(screen.getByText(title)).toHaveClass("td-title");
    expect(screen.getAllByText(title).length).toEqual(1);

    expect(container.getElementsByClassName("tr_active").length).toEqual(0);
    expect(container.getElementsByClassName("tr_cursordefault").length).toEqual(
      0
    );

    expect(screen.getByText(prot.toString())).toHaveClass("bgy-prot");
    expect(screen.getByText(fat.toString())).toHaveClass("bgy-fat");
    expect(screen.getByText(carbs.toString())).toHaveClass("bgy-carbs");

    expect(screen.getByText(String(portion) + measure)).toHaveClass("weight");
    expect(
      screen.getByText(getKkal(prot, fat, carbs).toString() + "ккал")
    ).toHaveClass("kkal");
  });
  it("handles click with data", () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow {...props} />
        </tbody>
      </table>
    );
    fireEvent.click(container.getElementsByClassName("tr")[0]);
    expect(props.onHandleClick).toHaveBeenCalledWith(props.food);
  });
  it("renders with weight is number", () => {
    const propsWeight = { ...props };
    propsWeight.weight = 56;
    const { prot, fat, carbs, measure } = propsWeight.food;
    const { weight } = propsWeight;
    render(
      <table>
        <tbody>
          <TableRow {...propsWeight} />
        </tbody>
      </table>
    );

    const pr = getFixed((weight * prot) / 100);
    const ft = getFixed((weight * fat) / 100);
    const cb = getFixed((weight * carbs) / 100);
    const kkal = getFixed(getKkal(pr, ft, cb));
    expect(screen.getByText(pr.toString())).toHaveClass("bgy-prot");
    expect(screen.getByText(ft.toString())).toHaveClass("bgy-fat");
    expect(screen.getByText(cb.toString())).toHaveClass("bgy-carbs");

    expect(screen.getByText(String(weight) + measure)).toHaveClass("weight");
    expect(screen.getByText(String(kkal) + "ккал")).toHaveClass("kkal");
  });
  it("renders with weight is null", () => {
    const propsWeight = { ...props };
    propsWeight.weight = null;
    render(
      <table>
        <tbody>
          <TableRow {...propsWeight} />
        </tbody>
      </table>
    );

    expect(screen.getAllByText(String(0)).length).toEqual(3);
    expect(screen.getByText(String(0) + "гр")).toHaveClass("weight");
    expect(screen.getByText(String(0) + "ккал")).toHaveClass("kkal");
  });
  it("renders with isActive = true", () => {
    const propsActive = { ...props };
    propsActive.isActive = true;

    const { container } = render(
      <table>
        <tbody>
          <TableRow {...propsActive} />
        </tbody>
      </table>
    );
    expect(container.getElementsByClassName("tr_active").length).toEqual(1);
  });
  it("renders with allDayMeal = true", () => {
    const propsDayMeal = { ...props };
    propsDayMeal.allDayMeal = true;

    const { container } = render(
      <table>
        <tbody>
          <TableRow {...propsDayMeal} />
        </tbody>
      </table>
    );
    expect(container.getElementsByClassName("tr_cursordefault").length).toEqual(1);
  });
});
