import { createTestApolloServer } from "@utils/mocks";
import { gql } from "apollo-server";
import { isString, map, uniq } from "lodash";

describe("⚡️⚡️⚡️⚡️ TECH TEST: WARMUP ⚡️⚡️⚡️⚡️", () => {
  const QUERY = gql`
    {
      messageList(quantity: 5)
    }
  `;

  it("warm-up", async () => {
    const { query } = createTestApolloServer();

    // run query against the server and snapshot the output
    const res = await query({
      query: QUERY,
    });
    expect(res.errors).toBeNil();
    expect(res.data.messageList.length).toEqual(5); // array of 5 elements
    expect(uniq(res.data.messageList).length).toEqual(5); // all different
    expect(map(res.data.messageList, isString)).toEqual([true, true, true, true, true]); // they are all strings
  });
});
