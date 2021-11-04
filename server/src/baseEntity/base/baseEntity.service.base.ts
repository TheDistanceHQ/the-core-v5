import { PrismaService } from "nestjs-prisma";
import { Prisma, BaseEntity, UserReaction } from "@prisma/client";

export class BaseEntityServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.BaseEntityFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BaseEntityFindManyArgs>
  ): Promise<number> {
    return this.prisma.baseEntity.count(args);
  }

  async findMany<T extends Prisma.BaseEntityFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BaseEntityFindManyArgs>
  ): Promise<BaseEntity[]> {
    return this.prisma.baseEntity.findMany(args);
  }
  async findOne<T extends Prisma.BaseEntityFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.BaseEntityFindUniqueArgs>
  ): Promise<BaseEntity | null> {
    return this.prisma.baseEntity.findUnique(args);
  }
  async create<T extends Prisma.BaseEntityCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BaseEntityCreateArgs>
  ): Promise<BaseEntity> {
    return this.prisma.baseEntity.create<T>(args);
  }
  async update<T extends Prisma.BaseEntityUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BaseEntityUpdateArgs>
  ): Promise<BaseEntity> {
    return this.prisma.baseEntity.update<T>(args);
  }
  async delete<T extends Prisma.BaseEntityDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.BaseEntityDeleteArgs>
  ): Promise<BaseEntity> {
    return this.prisma.baseEntity.delete(args);
  }

  async findUserReactions(
    parentId: string,
    args: Prisma.UserReactionFindManyArgs
  ): Promise<UserReaction[]> {
    return this.prisma.baseEntity
      .findUnique({
        where: { id: parentId },
      })
      .userReactions(args);
  }
}
