import { PrismaService } from "nestjs-prisma";
import { Prisma, ContentItem } from "@prisma/client";

export class ContentItemServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ContentItemFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ContentItemFindManyArgs>
  ): Promise<number> {
    return this.prisma.contentItem.count(args);
  }

  async findMany<T extends Prisma.ContentItemFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ContentItemFindManyArgs>
  ): Promise<ContentItem[]> {
    return this.prisma.contentItem.findMany(args);
  }
  async findOne<T extends Prisma.ContentItemFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ContentItemFindUniqueArgs>
  ): Promise<ContentItem | null> {
    return this.prisma.contentItem.findUnique(args);
  }
  async create<T extends Prisma.ContentItemCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ContentItemCreateArgs>
  ): Promise<ContentItem> {
    return this.prisma.contentItem.create<T>(args);
  }
  async update<T extends Prisma.ContentItemUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ContentItemUpdateArgs>
  ): Promise<ContentItem> {
    return this.prisma.contentItem.update<T>(args);
  }
  async delete<T extends Prisma.ContentItemDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ContentItemDeleteArgs>
  ): Promise<ContentItem> {
    return this.prisma.contentItem.delete(args);
  }
}
