import { UserReactionWhereInput } from "./UserReactionWhereInput";
import { UserReactionOrderByInput } from "./UserReactionOrderByInput";

export type UserReactionFindManyArgs = {
  where?: UserReactionWhereInput;
  orderBy?: UserReactionOrderByInput;
  skip?: number;
  take?: number;
};
