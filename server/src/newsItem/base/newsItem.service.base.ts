import { PrismaService } from "nestjs-prisma";
import { Prisma, NewsItem } from "@prisma/client";

export class NewsItemServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.NewsItemFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.NewsItemFindManyArgs>
  ): Promise<number> {
    return this.prisma.newsItem.count(args);
  }

  async findMany<T extends Prisma.NewsItemFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.NewsItemFindManyArgs>
  ): Promise<NewsItem[]> {
    return this.prisma.newsItem.findMany(args);
  }
  async findOne<T extends Prisma.NewsItemFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.NewsItemFindUniqueArgs>
  ): Promise<NewsItem | null> {
    return this.prisma.newsItem.findUnique(args);
  }
  async create<T extends Prisma.NewsItemCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.NewsItemCreateArgs>
  ): Promise<NewsItem> {
    return this.prisma.newsItem.create<T>(args);
  }
  async update<T extends Prisma.NewsItemUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.NewsItemUpdateArgs>
  ): Promise<NewsItem> {
    return this.prisma.newsItem.update<T>(args);
  }
  async delete<T extends Prisma.NewsItemDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.NewsItemDeleteArgs>
  ): Promise<NewsItem> {
    return this.prisma.newsItem.delete(args);
  }
}
