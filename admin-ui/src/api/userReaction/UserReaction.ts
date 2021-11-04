import { User } from "../user/User";
import { BaseEntity } from "../baseEntity/BaseEntity";
import { Reaction } from "../reaction/Reaction";

export type UserReaction = {
  createdAt: Date;
  createdBy?: User | null;
  entity?: BaseEntity | null;
  id: string;
  reaction?: Reaction | null;
  updatedAt: Date;
};
