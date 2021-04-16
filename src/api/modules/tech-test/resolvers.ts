import { QueryResolvers } from "@generated-types/schema-types";

const Query: Required<Pick<QueryResolvers, "messageList">> = {
  messageList: (_root, _args, _context) => {
    // TODO: COMPLETE WARM-UP EXERCISE
    // hint: have a look at the `makeFakeSentence` util available in the context;
    throw "not implemented yet";
  },
};

export default { Query };
