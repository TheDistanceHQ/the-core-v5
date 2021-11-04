import { ReactionWhereInput } from "./ReactionWhereInput";
import { ReactionOrderByInput } from "./ReactionOrderByInput";

export type ReactionFindManyArgs = {
  where?: ReactionWhereInput;
  orderBy?: ReactionOrderByInput;
  skip?: number;
  take?: number;
};
