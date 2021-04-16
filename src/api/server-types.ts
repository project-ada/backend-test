import { IdForFn } from "@utils/id-for";
import { MakeUUIDFunction } from "@utils/make-uuid";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import Chance from "chance";

export { ExpressContext };

export enum Environment {
  Development = "development",
  Test = "test",
  Production = "production",
}

export type EnvironmentConfig = {
  env: Environment;
  apollo: {
    introspection: boolean;
    playground: boolean;
  };
  port: number;
  host: string;
};

export type CustomContext = {
  makeUUID: MakeUUIDFunction;
  idFor: IdForFn;
  chance: Chance.Chance;
  makeFakeSentence: () => string;
};

export type Context = ExpressContext & CustomContext;
