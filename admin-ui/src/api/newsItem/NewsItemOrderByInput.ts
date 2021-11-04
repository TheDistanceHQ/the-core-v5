import { SortOrder } from "../../util/SortOrder";

export type NewsItemOrderByInput = {
  content?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  publishedAt?: SortOrder;
  summary?: SortOrder;
  title?: SortOrder;
  titleMediaUrl?: SortOrder;
  updatedAt?: SortOrder;
};
