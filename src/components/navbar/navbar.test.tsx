import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "./navbar";

describe("NavBar", () => {
  const props = {
    title: "Заголовок",
    onClickHandle: jest.fn(),
  };

  it("renders title and icons", () => {
    const { container } = render(<NavBar {...props} />);

    expect(screen.getByText(props.title)).toHaveClass("title");
    expect(container.getElementsByClassName("title").length).toEqual(1);

    expect(container.getElementsByClassName("burger-icon").length).toEqual(1);
    expect(container.getElementsByClassName("icon").length).toEqual(2);
  });

  it("renders menu button", () => {
    render(<NavBar {...props} />);

    const btns = screen.getAllByRole("button");
    expect(btns.length).toEqual(3);

    fireEvent.click(btns[0]);
    expect(props.onClickHandle).toBeCalledTimes(1);
  });
});
