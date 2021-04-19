import { rawIncidentFrom } from "@api/incidents-api";
import { Car, Incident } from "@generated-types/schema-types";
import { parseDayjsOrError } from "@plandek-utils/ts-parse-dayjs";
import { createTestApolloServer } from "@utils/mocks";
import { gql } from "apollo-server";

describe("`incidents`", () => {
  const QUERY = gql`
    {
      incidents {
        id
        carID
        severity
        date
      }
    }
  `;

  it("blank if overriding with an empty array", async () => {
    const { query } = createTestApolloServer({ incidents: [] });

    const res = await query({
      query: QUERY,
    });
    expect(res.errors).toBeNil();
    expect(res.data.incidents.length).toEqual(0);
  });

  it("returns the override incidents array", async () => {
    const cars: Car[] = [{ id: "car-1", colour: "red", type: "typeA", model: "modelA" }];

    const incidents: Incident[] = [
      { id: "A", carID: "car-1", date: parseDayjsOrError("2020-01-01"), severity: 3 },
      { id: "B", carID: "car-1", date: parseDayjsOrError("2020-01-02"), severity: 5 },
    ];

    const expectedIncidents = incidents.map((x) => rawIncidentFrom(x));

    const { query } = createTestApolloServer({ cars, incidents });

    const res = await query({
      query: QUERY,
    });
    expect(res.errors).toBeNil();
    expect(res.data.incidents.length).toEqual(2);
    expect(res.data.incidents).toEqual(expectedIncidents);
  });

  it("no overrides: uses the normal data", async () => {
    const { query } = createTestApolloServer();

    const res = await query({
      query: QUERY,
    });
    expect(res.errors).toBeNil();
    expect(res.data.incidents.length).toEqual(100);
  });
});
