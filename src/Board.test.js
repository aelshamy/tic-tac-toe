import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import { create } from "react-test-renderer";
import Board from "./Board";
import Square from "./Square";

describe("<Board/>", () => {
  beforeEach(() => {});

  test("it will match the snapshot", () => {
    const c = create(<Board />);
    expect(toJson(c)).toMatchSnapshot();
  });

  describe("createBoard()", () => {
    let board;
    beforeEach(() => {
      board = new Board();
    });
    test("should return empty board if no values provided", () => {
      const result = board.createBoard();
      expect(result).toEqual([]);
    });

    test("should return empty board if zero values provided", () => {
      const result = board.createBoard(0, 0);
      expect(result).toEqual([]);
    });

    test("should return empty board if only columns values provided", () => {
      const result = board.createBoard(null, 2);
      expect(result).toEqual([]);
    });

    test("should return only rows if rows value provided", () => {
      const result = board.createBoard(2);
      expect(result.length).toEqual(2);

      result.forEach(row => {
        expect(row.type).toEqual("div");
        expect(row.props.className).toEqual("row");
        expect(row.props.children).toEqual([]);
      });
    });

    test("should return full board if correct values provided", () => {
      spyOn(board, "renderSquare").and.returnValue(
        <span key={Math.random()} className="mock" />
      );
      const rowsValue = 3;
      const columnsValue = 3;
      const result = board.createBoard(rowsValue, columnsValue);
      // expect(Array.isArray(result)).toEqual(true);
      expect(result.length).toEqual(rowsValue);
      expect(board.renderSquare).toHaveBeenCalled();

      result.forEach(row => {
        expect(row.type).toEqual("div");
        expect(row.props.className).toEqual("row");
        expect(row.props.children.length).toEqual(columnsValue);
        row.props.children.forEach(column => {
          expect(column.type).toEqual("span");
          expect(column.props.className).toEqual("mock");
        });
      });
    });
  });

  describe("renderSquare()", () => {
    let board;
    beforeEach(() => {
      board = new Board();
    });
    test("should return Square with default value", () => {
      const result = board.renderSquare(1);
      expect(result.type).toEqual(Square);
      expect(result.key).toEqual("1");
      expect(result.props.value).toEqual("");
      expect(result.props.onClick).not.toBe(null);
    });

    test("should return Square with the correct value", () => {
      board.props = {
        values: ["first value", "second value"]
      };
      const result = board.renderSquare(1);
      expect(result.type).toEqual(Square);
      expect(result.key).toEqual("1");
      expect(result.props.value).toEqual("second value");
      expect(result.props.onClick).not.toBe(null);
    });
  });

  describe("render()", () => {
    let board;
    beforeEach(() => {
      board = new Board();
    });
    test("should call create board", () => {
      spyOn(board, "createBoard");
      board.render();
      expect(board.createBoard).toHaveBeenCalledWith(3, 3);
    });
    test("should render correctly", () => {
      const component = shallow(<Board />);
      expect(component.exists()).toBe(true);
    });
  });
});
