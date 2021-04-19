import { QueryResolvers } from "@generated-types/schema-types";

const Query: Required<Pick<QueryResolvers, "messageList">> = {
  messageList: (_root, args, context) => {
    // TODO: COMPLETE WARM-UP EXERCISE (look at the schema for the definition)
    // hint: have a look at the `context.makeFakeSentence()` util available in the context;
    console.log("[messageList]", { args, context });
    throw "not implemented yet";
  },
};

export default { Query };
