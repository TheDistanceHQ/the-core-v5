export type NewsItemCreateInput = {
  content?: string | null;
  publishedAt?: Date | null;
  summary?: string | null;
  title: string;
  titleMediaUrl?: string | null;
};
