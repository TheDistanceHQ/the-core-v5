import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
import { BaseEntityWhereUniqueInput } from "../baseEntity/BaseEntityWhereUniqueInput";
import { ReactionWhereUniqueInput } from "../reaction/ReactionWhereUniqueInput";

export type UserReactionUpdateInput = {
  createdBy?: UserWhereUniqueInput | null;
  entity?: BaseEntityWhereUniqueInput | null;
  reaction?: ReactionWhereUniqueInput | null;
};
