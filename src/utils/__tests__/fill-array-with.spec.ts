import { fillArrayWith } from "@utils/fill-array-with";

describe("fillArrayWith(10, () => randomString()) ", () => {
  it("returns a new array of the given length, with the result of calling the given function on each position", () => {
    const gen = (i: number) => `value-${i}`;
    const expected = ["value-0", "value-1", "value-2"];

    expect(fillArrayWith(3, gen)).toEqual(expected);
  });

  it("gen without arguments", () => {
    const gen = () => `value`;
    const expected = ["value", "value", "value"];

    expect(fillArrayWith(3, gen)).toEqual(expected);
  });
});
