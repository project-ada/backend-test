import { Car } from "@generated-types/schema-types";
import { createTestApolloServer } from "@utils/mocks";
import { gql } from "apollo-server";

describe("`cars`", () => {
  const QUERY = gql`
    {
      cars {
        id
        model
        type
        colour
      }
    }
  `;

  it("blank if overriding with an empty array", async () => {
    const { query } = createTestApolloServer({ cars: [] });

    const res = await query({
      query: QUERY,
    });
    expect(res.errors).toBeNil();
    expect(res.data.cars.length).toEqual(0);
  });

  it("returns the override cars array", async () => {
    const cars: Car[] = [
      { id: "A", type: "typeA", model: "modelA", colour: "colA" },
      { id: "B", type: "typeB", model: "modelB", colour: "colB" },
    ];

    const { query } = createTestApolloServer({ cars });

    const res = await query({
      query: QUERY,
    });
    expect(res.errors).toBeNil();
    expect(res.data.cars.length).toEqual(2);
    expect(res.data.cars).toEqual(cars);
  });

  it("no overrides: uses the normal data", async () => {
    const { query } = createTestApolloServer();

    const res = await query({
      query: QUERY,
    });
    expect(res.errors).toBeNil();
    expect(res.data.cars.length).toEqual(15);
  });
});
