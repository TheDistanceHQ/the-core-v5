import { SortOrder } from "../../util/SortOrder";

export type BaseEntityOrderByInput = {
  createdAt?: SortOrder;
  deletedAt?: SortOrder;
  id?: SortOrder;
  updatedAt?: SortOrder;
};
