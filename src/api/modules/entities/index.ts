import { loadTypeDefs } from "@utils/load-type-defs";
import { join } from "path";
import resolvers from "./resolvers";

const typeDefs = loadTypeDefs(join(__dirname, "./schema.graphql"));

export default { typeDefs, resolvers };
