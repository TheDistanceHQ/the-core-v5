import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type ContentItemWhereInput = {
  content?: StringNullableFilter;
  id?: StringFilter;
  summary?: StringNullableFilter;
  title?: StringFilter;
};
