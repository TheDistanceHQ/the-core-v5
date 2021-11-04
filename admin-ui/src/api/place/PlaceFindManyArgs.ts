import { PlaceWhereInput } from "./PlaceWhereInput";
import { PlaceOrderByInput } from "./PlaceOrderByInput";

export type PlaceFindManyArgs = {
  where?: PlaceWhereInput;
  orderBy?: PlaceOrderByInput;
  skip?: number;
  take?: number;
};
