import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import { create } from "react-test-renderer";
import Square from "./Square";

describe("<Sauare/>", () => {
  beforeEach(() => {});

  test("it will match the snapshot", () => {
    const c = create(<Square />);
    expect(toJson(c)).toMatchSnapshot();
  });

  describe("render()", () => {
    test("should render correctly", () => {
      const component = shallow(<Square />);
      expect(component.exists()).toBe(true);
      expect(component.find("button").exists()).toBe(true);
      expect(component.find("button").props().className).toEqual("square");
    });

    test("should rendered with the correct props", () => {
      const onClickFunction = () => {};
      const component = shallow(<Square onClick={onClickFunction} value="X" />);
      expect(component.find("button").props().children).toEqual("X");
      expect(component.find("button").props().onClick).toEqual(onClickFunction);
    });

    test("should use the click function provided", () => {
      let clicked = false;
      const onClickFunction = () => {
        clicked = true;
      };
      const component = shallow(
        <Square onClick={onClickFunction} value="AnyValue" />
      );
      expect(component.find("button").props().children).toEqual("AnyValue");
      expect(component.find("button").props().onClick).toEqual(onClickFunction);
      component.find("button").simulate("click");
      expect(clicked).toEqual(true);
    });
  });
});
