import { UserReaction as TUserReaction } from "../api/userReaction/UserReaction";

export const USERREACTION_TITLE_FIELD = "id";

export const UserReactionTitle = (record: TUserReaction): string => {
  return record.id || record.id;
};
