import { UserReaction } from "../userReaction/UserReaction";

export type Reaction = {
  createdAt: Date;
  id: string;
  type: string;
  updatedAt: Date;
  userReactions?: Array<UserReaction>;
};
