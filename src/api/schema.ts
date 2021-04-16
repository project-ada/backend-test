import modules from "@api/modules/index";
import { makeExecutableSchema } from "apollo-server";

// note: ApolloServer's modules have a bunch of bugs still
// e.g. https://github.com/apollographql/apollo-server/issues/2218
// so for now we need to makeExecutableSchema

const tmpSchema = makeExecutableSchema({
  typeDefs: modules.map((m) => m.typeDefs),
  resolvers: modules.map((m) => m.resolvers),
});

export const schema = tmpSchema;
