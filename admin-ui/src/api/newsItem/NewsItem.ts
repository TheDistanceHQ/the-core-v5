export type NewsItem = {
  content: string | null;
  createdAt: Date;
  id: string;
  publishedAt: Date | null;
  summary: string | null;
  title: string;
  titleMediaUrl: string | null;
  updatedAt: Date;
};
