import { createTestApolloServer } from "@utils/mocks";
import gql from "graphql-tag";
import "reflect-metadata";

describe("GraphQL Query: ping", () => {
  it("returns `ok`", async () => {
    const { query } = createTestApolloServer();

    const PING_QUERY = gql`
      {
        ping
      }
    `;

    // run query against the server and snapshot the output
    const res = await query({
      query: PING_QUERY,
    });
    const expectedData = { ping: "ok" };
    expect(res.data).toEqual(expectedData);
  });
});

describe("GraphQL Mutation: mutantPing", () => {
  it("returns the given value", async () => {
    const { mutate } = createTestApolloServer();

    const PING_QUERY = gql`
      mutation {
        mutantPing(value: "Paco")
      }
    `;

    // run query against the server and snapshot the output
    const res = await mutate({
      mutation: PING_QUERY,
    });
    const expectedData = { mutantPing: "Paco" };
    expect(res.data).toEqual(expectedData);
  });
});
