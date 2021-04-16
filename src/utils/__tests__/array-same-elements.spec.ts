import { arraySameElements } from "@utils/array-same-elements";

describe("arraySameElements(a, b)", () => {
  it("arraySameElements([], []) # => true", () => {
    expect(arraySameElements([], [])).toBeTrue();
  });

  it("arraySameElements([1, 2, 3], [1, 2, 3]) # => true", () => {
    expect(arraySameElements([1, 2, 3], [1, 2, 3])).toBeTrue();
  });

  it("arraySameElements([1, 2, 3], [3, 1, 2]) # => true", () => {
    expect(arraySameElements([1, 2, 3], [3, 1, 2])).toBeTrue();
  });

  it("arraySameElements([1, 2], [3, 1, 2]) # => false", () => {
    expect(arraySameElements([1, 2], [3, 1, 2])).toBeFalse();
  });

  it("arraySameElements([1, 2, 3], [1, 2]) # => false", () => {
    expect(arraySameElements([1, 2, 3], [1, 2])).toBeFalse();
  });
});
