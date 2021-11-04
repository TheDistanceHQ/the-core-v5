import { SortOrder } from "../../util/SortOrder";

export type UserReactionOrderByInput = {
  createdAt?: SortOrder;
  createdById?: SortOrder;
  entityId?: SortOrder;
  id?: SortOrder;
  reactionId?: SortOrder;
  updatedAt?: SortOrder;
};
