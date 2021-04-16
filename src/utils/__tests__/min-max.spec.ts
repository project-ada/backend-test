import { maxOf, minOf } from "@utils/min-max";

describe("minOf(a, b)", () => {
  it("minOf(1, 1) => 1", () => {
    expect(minOf(1, 1)).toEqual(1);
  });
  it("minOf(1, 2) => 1", () => {
    expect(minOf(1, 2)).toEqual(1);
  });
  it("minOf(2, 1) => 1", () => {
    expect(minOf(2, 1)).toEqual(1);
  });
});

describe("maxOf(a, b)", () => {
  it("maxOf(1, 1) => 1", () => {
    expect(maxOf(1, 1)).toEqual(1);
  });
  it("maxOf(1, 2) => 1", () => {
    expect(maxOf(1, 2)).toEqual(2);
  });
  it("maxOf(2, 1) => 1", () => {
    expect(maxOf(2, 1)).toEqual(2);
  });
});
