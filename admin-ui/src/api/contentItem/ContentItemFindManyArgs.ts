import { ContentItemWhereInput } from "./ContentItemWhereInput";
import { ContentItemOrderByInput } from "./ContentItemOrderByInput";

export type ContentItemFindManyArgs = {
  where?: ContentItemWhereInput;
  orderBy?: ContentItemOrderByInput;
  skip?: number;
  take?: number;
};
