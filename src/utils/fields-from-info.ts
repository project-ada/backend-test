import { GraphQLResolveInfo } from "graphql";
import graphqlFields from "graphql-fields";

export type FieldsFromInfo = { [key: string]: FieldsFromInfo | undefined };

export function fieldsFromInfo(info: GraphQLResolveInfo): FieldsFromInfo {
  // note: issue with conflicting types of GraphQLResolveInfo v15 vs v14 as expected by one of the dependencies of graphql-fields. Not an issue. Forcing TS to be cool with it until they publish a new version

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return graphqlFields(info);
}
