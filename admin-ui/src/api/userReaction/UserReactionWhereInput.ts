import { BaseEntityWhereUniqueInput } from "../baseEntity/BaseEntityWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { ReactionWhereUniqueInput } from "../reaction/ReactionWhereUniqueInput";

export type UserReactionWhereInput = {
  entity?: BaseEntityWhereUniqueInput;
  id?: StringFilter;
  reaction?: ReactionWhereUniqueInput;
};
