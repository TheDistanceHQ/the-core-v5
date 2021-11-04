import { SortOrder } from "../../util/SortOrder";

export type CommentOrderByInput = {
  content?: SortOrder;
  createdAt?: SortOrder;
  createdById?: SortOrder;
  id?: SortOrder;
  updatedAt?: SortOrder;
};
