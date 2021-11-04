import { NewsItem as TNewsItem } from "../api/newsItem/NewsItem";

export const NEWSITEM_TITLE_FIELD = "title";

export const NewsItemTitle = (record: TNewsItem): string => {
  return record.title || record.id;
};
