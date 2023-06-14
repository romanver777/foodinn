import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "./sidebar";
import routes from "../../routes/routes";
import { BrowserRouter } from "react-router-dom";

describe("Sidebar", () => {
  const props = {
    routes,
    activePage: "",
    isOpen: false,
    onClickHandle: jest.fn(),
  };
  const getBtn = () => screen.getByRole("button");

  it("renders sidebar and burger button closed", () => {
    const { container } = render(
      <BrowserRouter>
        <Sidebar {...props} />
      </BrowserRouter>
    );

    expect(container.querySelector(".sidebar")).not.toHaveClass("sidebar_open");
    expect(getBtn()).toHaveClass("burger-btn");
    expect(getBtn()).not.toHaveClass("burger-btn_visible");
  });
  it("renders sidebar and burger button opened", () => {
    const prop = { ...props };
    prop.isOpen = true;
    const { container } = render(
      <BrowserRouter>
        <Sidebar {...prop} />
      </BrowserRouter>
    );

    expect(container.querySelector(".sidebar")).toHaveClass("sidebar_open");
    expect(getBtn()).toHaveClass("burger-btn");
    expect(getBtn()).toHaveClass("burger-btn_visible");

    fireEvent.click(screen.getByRole("button"));
    expect(props.onClickHandle).toHaveBeenCalledTimes(1);
  });
  it("renders logo text", () => {
    const { container } = render(
      <BrowserRouter>
        <Sidebar {...props} />
      </BrowserRouter>
    );
    expect(container.getElementsByClassName("logo").length).toEqual(1);
    expect(screen.getByText("Food in numbers")).toHaveClass("logo");
  });
  it("renders routes", () => {
    render(
      <BrowserRouter>
        <Sidebar {...props} />
      </BrowserRouter>
    );
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toEqual(props.routes.length);

    listItems.forEach((item, i) => {
      i === 0
        ? expect(item).toHaveClass("list-item_active")
        : expect(item).not.toHaveClass("list-item_active");
    });

    const links = screen.getAllByRole("link");
    expect(links.length).toEqual(props.routes.length);

    links.forEach((link, i) => {
      expect(link).toHaveTextContent(props.routes[i].name);
      expect(link).toHaveAttribute("href", "/" + props.routes[i].path);
    });
  });
  it("renders with another active page", () => {
    const prop = { ...props };
    prop.activePage = prop.routes[1].path;

    render(
      <BrowserRouter>
        <Sidebar {...prop} />
      </BrowserRouter>
    );
    const listItems = screen.getAllByRole("listitem");

    listItems.forEach((item, i) => {
      i === 1
        ? expect(item).toHaveClass("list-item_active")
        : expect(item).not.toHaveClass("list-item_active");
    });
  });
});
