import { camelKeysDeep } from "@utils/camel-keys-deep";
import "reflect-metadata";

describe("camelKeysDeep()", () => {
  it("with null: returns null", async () => {
    expect(camelKeysDeep(null)).toBeNull();
  });

  it("with string: returns the string", async () => {
    expect(camelKeysDeep("")).toBe("");
    expect(camelKeysDeep("abc")).toBe("abc");
    expect(camelKeysDeep("a_b_c")).toBe("a_b_c");
  });

  it("with string: returns the string", async () => {
    expect(camelKeysDeep("")).toBe("");
    expect(camelKeysDeep("abc")).toBe("abc");
    expect(camelKeysDeep("a_b_c")).toBe("a_b_c");
  });

  it("with object: returns an object with keys camelized", async () => {
    expect(camelKeysDeep({})).toEqual({});
    expect(camelKeysDeep({ abc: "my-val" })).toEqual({ abc: "my-val" });
    expect(camelKeysDeep({ a_b_casa: "my-val" })).toEqual({ aBCasa: "my-val" });
  });

  it("with object nested: returns an object with a nested object with keys camelized", async () => {
    expect(camelKeysDeep({ abc: { a_b_casa: "my-val" } })).toEqual({
      abc: { aBCasa: "my-val" },
    });
    expect(camelKeysDeep({ a_b_casa: { a_b_casa: "my-val" } })).toEqual({
      aBCasa: { aBCasa: "my-val" },
    });
  });

  it("with an array of object nested: returns an array of object with a nested object with keys camelized", async () => {
    expect(camelKeysDeep([{ abc: { a_b_casa: "my-val" } }])).toEqual([
      {
        abc: { aBCasa: "my-val" },
      },
    ]);
    expect(camelKeysDeep([{ a_b_casa: { a_b_casa: "my-val" } }])).toEqual([
      {
        aBCasa: { aBCasa: "my-val" },
      },
    ]);
  });
});
