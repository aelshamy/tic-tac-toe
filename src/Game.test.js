import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import { create } from "react-test-renderer";
import Game from "./Game";

describe("<Game/>", () => {
  let game = Game;
  beforeEach(() => {
    game = new Game();
  });

  test("it will match the snapshot", () => {
    const c = create(<Game />);
    expect(toJson(c)).toMatchSnapshot();
  });

  test("should intialize with the default values", () => {
    expect(game.state).not.toBe(null);
    expect(game.state.values.length).toEqual(9);
    expect(game.state.values[0]).toEqual(null);
    expect(game.state.playerIsNext).toEqual(true);
  });

  describe("calculateWinner()", () => {
    test("should return null if the provided values is not one of the wining squares", () => {
      let result = game.calculateWinner([]);
      expect(result).toBe(null);
      result = game.calculateWinner(["X", "X", "O"]);
      expect(result).toBe(null);
    });

    test("should return the winner if the provided value one of the wining squares", () => {
      const result = game.calculateWinner(["X", "X", "X"]);
      expect(result).toBe("X");
    });
  });

  describe("handleClick()", () => {
    test("should return if there is a winner", () => {
      spyOn(game, "calculateWinner").and.returnValue("X");
      spyOn(game, "setState");
      game.handleClick(1);
      expect(game.setState).not.toHaveBeenCalled();
    });

    test("should return if user clicked on existed square", () => {
      game.state.values = [null, "X", null];
      spyOn(game, "setState");
      const result = game.handleClick(1);
      expect(game.setState).not.toHaveBeenCalled();
    });

    test("should set the correct values to the state", () => {
      spyOn(game, "setState");
      const index = 1;
      const expectedValues = [...game.state.values];
      expectedValues[index] = "X";
      game.handleClick(index);
      expect(game.setState).toHaveBeenCalledWith({
        playerIsNext: !game.state.playerIsNext,
        values: expectedValues
      });
    });
  });

  describe("resetGame()", () => {
    test("should rest game to default", () => {
      spyOn(game, "setState");
      game.resetGame();
      expect(game.setState).toHaveBeenCalledWith({
        values: Array(9).fill(null),
        playerIsNext: true
      });
    });
  });

  describe("render()", () => {
    test("should render game correctly", () => {
      const component = shallow(<Game />);
      expect(component).toMatchSnapshot();
      expect(component.find(".game").exists()).toBe(true);
      expect(component.find("Board").exists()).toBe(true);
      expect(component.find("result").exists()).toBe(false);
    });

    test("should render game with won result", () => {
      const component = shallow(<Game />);
      component.setState({
        values: ["X", "X", "X"],
        playerIsNext: false
      });

      // console.log(component.state());
      expect(component.find("Board").exists()).toBe(false);
      expect(component.find(".result").exists()).toBe(true);
      expect(
        component
          .find(".result")
          .find(".winner")
          .exists()
      ).toBe(true);
      expect(
        component
          .find(".result")
          .find(".loser")
          .exists()
      ).toBe(false);
      expect(
        component
          .find(".result")
          .find("button")
          .exists()
      ).toBe(true);
    });
    test("should render game with won result", () => {
      const component = shallow(<Game />);
      component.setState({
        values: ["O", "O", "O"],
        playerIsNext: true
      });

      expect(component.find("Board").exists()).toBe(false);
      expect(component.find(".result").exists()).toBe(true);
      expect(
        component
          .find(".result")
          .find(".winner")
          .exists()
      ).toBe(false);
      expect(
        component
          .find(".result")
          .find(".loser")
          .exists()
      ).toBe(true);
      expect(
        component
          .find(".result")
          .find("button")
          .exists()
      ).toBe(true);
    });
  });
});
