/* eslint-disable @typescript-eslint/no-var-requires */
// jest.config.js
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { defaults: tsjPreset } = require("ts-jest/presets");

const fs = require("fs");
const stripJsonComments = require("strip-json-comments");

const tsConfigJSON = fs.readFileSync("./tsconfig.json").toString();

const { compilerOptions } = JSON.parse(stripJsonComments(tsConfigJSON));

module.exports = {
  setupFilesAfterEnv: ["./jest.setup.js"],
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/",
  }),
  transform: {
    ...tsjPreset.transform,
  },
  testMatch: ["**/__tests__/**/*.(spec|test).[jt]s?(x)"],
  roots: ["src"],
  coverageReporters: ["json", "lcov", "text", "html"],
  collectCoverageFrom: [
    "src/api/modules/tech-test/**/*.{js,jsx,ts,tsx}",
    "!src/**/__tests__/**",
    "!src/__generated__/**",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
};
