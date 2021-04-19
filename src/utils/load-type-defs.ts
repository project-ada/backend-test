/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadTypedefsSync } from "@graphql-tools/load";
import { colorPrettyJSON } from "@utils/pretty-json";

export function loadTypeDefs(filePath: string) {
  const list = loadTypedefsSync(filePath, {
    loaders: [new GraphQLFileLoader()],
  });
  if (list.length > 1) {
    throw new Error(`multiple sources detected on filePath ${colorPrettyJSON(list)}`);
  }

  const doc = list[0].document;

  if (!doc) {
    throw new Error(`no document detected in the source loaded on filePath ${colorPrettyJSON(list)}`);
  }

  return doc;
}
