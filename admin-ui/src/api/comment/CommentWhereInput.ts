import { StringNullableFilter } from "../../util/StringNullableFilter";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";

export type CommentWhereInput = {
  content?: StringNullableFilter;
  createdBy?: UserWhereUniqueInput;
  id?: StringFilter;
};
