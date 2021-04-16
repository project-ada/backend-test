/* eslint-disable */

// from https://github.com/bisonfoutu/nest-tsconfig-paths-example
const fs = require("fs");
const stripJsonComments = require("strip-json-comments");
const tsConfigPaths = require("tsconfig-paths");

const tsConfigJSON = fs.readFileSync("./tsconfig.json").toString();
const tsConfig = JSON.parse(stripJsonComments(tsConfigJSON));

const baseUrl = "./dist"; // Either absolute or relative path. If relative it's resolved to current working directory.
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths
});
