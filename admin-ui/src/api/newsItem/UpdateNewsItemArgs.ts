import { NewsItemWhereUniqueInput } from "./NewsItemWhereUniqueInput";
import { NewsItemUpdateInput } from "./NewsItemUpdateInput";

export type UpdateNewsItemArgs = {
  where: NewsItemWhereUniqueInput;
  data: NewsItemUpdateInput;
};
