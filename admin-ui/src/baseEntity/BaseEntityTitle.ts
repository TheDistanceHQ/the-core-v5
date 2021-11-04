import { BaseEntity as TBaseEntity } from "../api/baseEntity/BaseEntity";

export const BASEENTITY_TITLE_FIELD = "id";

export const BaseEntityTitle = (record: TBaseEntity): string => {
  return record.id || record.id;
};
