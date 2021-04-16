import { findNumber, findNumberStrict } from "@utils/find-number";
import "reflect-metadata";

describe("findNumberStrict()", () => {
  it("with { a: { b: 1 }}, 'a.b': returns 1", async () => {
    expect(findNumberStrict({ a: { b: 1 } }, "a.b")).toEqual(1);
  });

  it("with { a: { b: '1' }}, 'a.b': returns 1", async () => {
    expect(findNumberStrict({ a: { b: "1" } }, "a.b")).toEqual(1);
  });

  it("with { a: { b: 1 }}, 'a.b.c': throws error", async () => {
    expect(() => findNumberStrict({ a: { b: 1 } }, "a.b.c")).toThrowError();
  });

  it("with { a: { b: 'something' }}, 'a.b': throws error", async () => {
    expect(() => findNumberStrict({ a: { b: "something" } }, "a.b")).toThrowError();
  });

  it("with { a: { b: null }}, 'a.b': throws error", async () => {
    expect(() => findNumberStrict({ a: { b: null } }, "a.b")).toThrowError();
  });

  it("with { a: { b: [1] }}, 'a.b': throws error", async () => {
    expect(() => findNumberStrict({ a: { b: [1] } }, "a.b")).toThrowError();
  });
});

describe("findNumber()", () => {
  it("with { a: { b: 1 }}, 'a.b': returns 1", async () => {
    expect(findNumber({ a: { b: 1 } }, "a.b", 0)).toEqual(1);
  });

  it("with { a: { b: '1' }}, 'a.b': returns 1", async () => {
    expect(findNumber({ a: { b: "1" } }, "a.b", 0)).toEqual(1);
  });

  it("with { a: { b: 1 }}, 'a.b.c': returns default", async () => {
    expect(findNumber({ a: { b: 1 } }, "a.b.c", 0)).toEqual(0);
  });

  it("with { a: { b: 'something' }}, 'a.b': throws error", async () => {
    expect(findNumber({ a: { b: "something" } }, "a.b", 0)).toEqual(0);
  });

  it("with { a: { b: null }}, 'a.b': throws error", async () => {
    expect(findNumber({ a: { b: null } }, "a.b", 0)).toEqual(0);
  });

  it("with { a: { b: [1] }}, 'a.b': throws error", async () => {
    expect(findNumber({ a: { b: [1] } }, "a.b", 0)).toEqual(0);
  });
});
