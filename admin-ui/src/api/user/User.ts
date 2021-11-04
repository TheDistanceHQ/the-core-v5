import { Comment } from "../comment/Comment";
import { UserReaction } from "../userReaction/UserReaction";

export type User = {
  comments?: Array<Comment>;
  createdAt: Date;
  firstName: string | null;
  id: string;
  lastName: string | null;
  roles: Array<string>;
  updatedAt: Date;
  username: string;
  userReactions?: Array<UserReaction>;
};
