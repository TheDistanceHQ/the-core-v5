import { NewsItemWhereInput } from "./NewsItemWhereInput";
import { NewsItemOrderByInput } from "./NewsItemOrderByInput";

export type NewsItemFindManyArgs = {
  where?: NewsItemWhereInput;
  orderBy?: NewsItemOrderByInput;
  skip?: number;
  take?: number;
};
