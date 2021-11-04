import { ContentItem as TContentItem } from "../api/contentItem/ContentItem";

export const CONTENTITEM_TITLE_FIELD = "title";

export const ContentItemTitle = (record: TContentItem): string => {
  return record.title || record.id;
};
