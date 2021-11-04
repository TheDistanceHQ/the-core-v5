import { SortOrder } from "../../util/SortOrder";

export type ReactionOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  type?: SortOrder;
  updatedAt?: SortOrder;
};
