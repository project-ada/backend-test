import { MutationResolvers, QueryResolvers } from "@generated-types/schema-types";
import { dayjsNow } from "@plandek-utils/ts-parse-dayjs";
import { loadTypeDefs } from "@utils/load-type-defs";
import { join } from "path";
import scalarResolvers from "./scalars";

const typeDefs = loadTypeDefs(join(__dirname, "./schema.graphql"));

const Mutation: Required<Pick<MutationResolvers, "mutantPing">> = {
  mutantPing: (_root, { value }) => value,
};

const Query: Required<Pick<QueryResolvers, "ping" | "now">> = {
  ping: () => "ok",
  now: () => dayjsNow(),
};

export default {
  typeDefs,
  resolvers: { Query, Mutation, ...scalarResolvers },
};
