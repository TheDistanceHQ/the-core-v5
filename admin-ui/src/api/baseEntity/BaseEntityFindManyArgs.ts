import { BaseEntityWhereInput } from "./BaseEntityWhereInput";
import { BaseEntityOrderByInput } from "./BaseEntityOrderByInput";

export type BaseEntityFindManyArgs = {
  where?: BaseEntityWhereInput;
  orderBy?: BaseEntityOrderByInput;
  skip?: number;
  take?: number;
};
