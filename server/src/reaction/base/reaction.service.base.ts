import { PrismaService } from "nestjs-prisma";
import { Prisma, Reaction, UserReaction } from "@prisma/client";

export class ReactionServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ReactionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReactionFindManyArgs>
  ): Promise<number> {
    return this.prisma.reaction.count(args);
  }

  async findMany<T extends Prisma.ReactionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReactionFindManyArgs>
  ): Promise<Reaction[]> {
    return this.prisma.reaction.findMany(args);
  }
  async findOne<T extends Prisma.ReactionFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReactionFindUniqueArgs>
  ): Promise<Reaction | null> {
    return this.prisma.reaction.findUnique(args);
  }
  async create<T extends Prisma.ReactionCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReactionCreateArgs>
  ): Promise<Reaction> {
    return this.prisma.reaction.create<T>(args);
  }
  async update<T extends Prisma.ReactionUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReactionUpdateArgs>
  ): Promise<Reaction> {
    return this.prisma.reaction.update<T>(args);
  }
  async delete<T extends Prisma.ReactionDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReactionDeleteArgs>
  ): Promise<Reaction> {
    return this.prisma.reaction.delete(args);
  }

  async findUserReactions(
    parentId: string,
    args: Prisma.UserReactionFindManyArgs
  ): Promise<UserReaction[]> {
    return this.prisma.reaction
      .findUnique({
        where: { id: parentId },
      })
      .userReactions(args);
  }
}
