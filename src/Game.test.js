import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import { create } from "react-test-renderer";
import Game from "./Game";

describe("<Game/>", () => {
  beforeEach(() => {});

  test("it will match the snapshot", () => {
    const c = create(<Game />);
    expect(toJson(c)).toMatchSnapshot();
  });

  describe("render()", () => {
    test("should render correctly", () => {
      const component = shallow(<Game />);
      expect(component).toMatchSnapshot();
      expect(component.find(".game").exists()).toBe(true);
      expect(component.find("Board").exists()).toBe(true);
    });
  });
});
