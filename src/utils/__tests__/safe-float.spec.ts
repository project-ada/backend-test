import { safeFloat } from "@utils/safe-float";
import "reflect-metadata";

describe("safeFloat()", () => {
  it("with null: returns 0", () => {
    expect(safeFloat(null)).toEqual(0);
  });

  it("with empty string: returns 0", () => {
    expect(safeFloat("")).toEqual(0);
  });

  it("with NaN: returns 0", () => {
    expect(safeFloat(NaN)).toEqual(0);
  });

  it("with Infinity: returns 0", () => {
    expect(safeFloat(Infinity)).toEqual(0);
  });

  it("with any string: returns 0", () => {
    expect(safeFloat("  whatever is this ")).toEqual(0);
  });

  it("with a string with a number (float) inside (ignores leading/rearing spaces): returns the number", () => {
    expect(safeFloat("  413.3 ")).toEqual(413.3);
  });

  it("with a string with a number (int) inside (ignores leading/rearing spaces): returns the number", () => {
    expect(safeFloat("   413 ")).toEqual(413);
  });

  it("with a number (float) inside: returns the same number", () => {
    expect(safeFloat(413.3)).toEqual(413.3);
  });

  it("with a number (int) inside: returns the same number", () => {
    expect(safeFloat(413)).toEqual(413);
  });

  it("with an array of numbers: returns the first number", () => {
    expect(safeFloat([42, 13, 23])).toEqual(42);
    expect(safeFloat([" 42 ", "13", "23"])).toEqual(42);
  });

  it("with an empty array: returns 0", () => {
    expect(safeFloat([])).toEqual(0);
  });

  it("with a date: returns 0", () => {
    const str = "2018-01-01T00:00:00.000Z";
    const d1 = new Date(str);
    const d2 = new Date("2018-01-01");
    expect(safeFloat(d1)).toEqual(0);
    expect(safeFloat(d2)).toEqual(0);
  });
});
