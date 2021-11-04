import { Place as TPlace } from "../api/place/Place";

export const PLACE_TITLE_FIELD = "title";

export const PlaceTitle = (record: TPlace): string => {
  return record.title || record.id;
};
