import { UserReaction } from "../userReaction/UserReaction";

export type BaseEntity = {
  createdAt: Date;
  deletedAt: Date | null;
  id: string;
  updatedAt: Date;
  userReactions?: Array<UserReaction>;
};
