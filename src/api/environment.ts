import parseBoolean from "@eturino/ts-parse-boolean";
import { Environment, EnvironmentConfig } from "./server-types";

export const environment: EnvironmentConfig = {
  env: calculateEnv(),
  apollo: {
    introspection: parseBoolean(process.env.APOLLO_INTROSPECTION),
    playground: parseBoolean(process.env.APOLLO_PLAYGROUND),
  },
  port: parseInt(process.env.PORT || "4000", 10),
  host: "0.0.0.0",
};

function calculateEnv(): Environment {
  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv === "test") {
    return Environment.Test;
  }
  if (nodeEnv === "prod" || nodeEnv === "production") {
    return Environment.Production;
  }
  return Environment.Development;
}
