import { SortOrder } from "../../util/SortOrder";

export type ProductOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  price?: SortOrder;
  summary?: SortOrder;
  title?: SortOrder;
  updatedAt?: SortOrder;
};
