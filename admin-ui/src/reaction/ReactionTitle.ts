import { Reaction as TReaction } from "../api/reaction/Reaction";

export const REACTION_TITLE_FIELD = "type";

export const ReactionTitle = (record: TReaction): string => {
  return record.type || record.id;
};
