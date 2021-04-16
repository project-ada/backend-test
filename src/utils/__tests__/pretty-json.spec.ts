import { prettyJSON } from "@utils/pretty-json";
import "reflect-metadata";

describe("prettyJSON()", () => {
  it("with null: returns 'null'", async () => {
    expect(prettyJSON(null)).toEqual("null");
  });

  it("with 1: returns '1'", async () => {
    expect(prettyJSON(1)).toEqual("1");
  });

  it("with 'abc': returns '\"abc\"'", async () => {
    expect(prettyJSON("abc")).toEqual('"abc"');
  });

  it("with []: returns '[]'", async () => {
    expect(prettyJSON([])).toEqual("[]");
  });

  it("with {}: returns '{}'", async () => {
    expect(prettyJSON({})).toEqual("{}");
  });

  it("with { a: 1 }: returns '{ a: 1 }' formatted", async () => {
    expect(prettyJSON({ a: 1 })).toEqual('{\n  "a": 1\n}');
  });
});
