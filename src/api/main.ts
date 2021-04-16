/* eslint-disable @typescript-eslint/no-var-requires */

import { buildContext } from "@api/context";
import { colorPrettyJSON } from "@utils/pretty-json";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { formatError } from "graphql";
import { environment } from "./environment";
import { schema } from "./schema";

const expressPlayground = require("graphql-playground-middleware-express").default;

const server = new ApolloServer({
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
  schema,
  tracing: true,
  context: buildContext,
  formatError: (e) => {
    console.error(colorPrettyJSON(e));
    return formatError(e);
  },
});

export const app = express();

app.use(express.json({ limit: "10mb" }));

app.get("/", expressPlayground({ endpoint: "/graphql" }));

app.get("/health-check", function hello(req, res) {
  return buildContext({ req, res })
    .then((ctx) => {
      res.send({ message: "ok", contextJSON: colorPrettyJSON(ctx) });
    })
    .catch((error) => {
      res.send({ errors: error });
    });
});

app.get("/test-error", function hello(_req, _res) {
  throw new Error("hello from Express");
});

server.applyMiddleware({ app });
