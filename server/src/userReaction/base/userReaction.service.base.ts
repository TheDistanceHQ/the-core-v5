import { PrismaService } from "nestjs-prisma";
import {
  Prisma,
  UserReaction,
  User,
  BaseEntity,
  Reaction,
} from "@prisma/client";

export class UserReactionServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.UserReactionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserReactionFindManyArgs>
  ): Promise<number> {
    return this.prisma.userReaction.count(args);
  }

  async findMany<T extends Prisma.UserReactionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserReactionFindManyArgs>
  ): Promise<UserReaction[]> {
    return this.prisma.userReaction.findMany(args);
  }
  async findOne<T extends Prisma.UserReactionFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserReactionFindUniqueArgs>
  ): Promise<UserReaction | null> {
    return this.prisma.userReaction.findUnique(args);
  }
  async create<T extends Prisma.UserReactionCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserReactionCreateArgs>
  ): Promise<UserReaction> {
    return this.prisma.userReaction.create<T>(args);
  }
  async update<T extends Prisma.UserReactionUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserReactionUpdateArgs>
  ): Promise<UserReaction> {
    return this.prisma.userReaction.update<T>(args);
  }
  async delete<T extends Prisma.UserReactionDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserReactionDeleteArgs>
  ): Promise<UserReaction> {
    return this.prisma.userReaction.delete(args);
  }

  async getCreatedBy(parentId: string): Promise<User | null> {
    return this.prisma.userReaction
      .findUnique({
        where: { id: parentId },
      })
      .createdBy();
  }

  async getEntity(parentId: string): Promise<BaseEntity | null> {
    return this.prisma.userReaction
      .findUnique({
        where: { id: parentId },
      })
      .entity();
  }

  async getReaction(parentId: string): Promise<Reaction | null> {
    return this.prisma.userReaction
      .findUnique({
        where: { id: parentId },
      })
      .reaction();
  }
}
