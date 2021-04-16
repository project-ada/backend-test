import { QueryResolvers } from "@generated-types/schema-types";

const Query: Required<Pick<QueryResolvers, "messageList">> = {
  messageList: (_root, _args, _context) => {
    // TODO: COMPLETE WARM-UP EXERCISE
    throw "not implemented yet";
  },
};

export default { Query };
