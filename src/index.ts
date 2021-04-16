/* eslint-disable @typescript-eslint/no-var-requires */
// organize-imports-ignore

require("dotenv").config();
import "reflect-metadata";

import { environment } from "@api/environment";
import { app } from "@api/main";

const { env, port, host } = environment;
app.listen(port, host, () =>
  console.log(`\n🚀 API Server (env: ${env}) ready at http://${host}:${port}.\nYou can see GraphQL Playground on '/'\n`)
);
