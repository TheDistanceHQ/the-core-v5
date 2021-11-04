import { SortOrder } from "../../util/SortOrder";

export type ContentItemOrderByInput = {
  content?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  summary?: SortOrder;
  title?: SortOrder;
  titleMediaUrl?: SortOrder;
  updatedAt?: SortOrder;
};
