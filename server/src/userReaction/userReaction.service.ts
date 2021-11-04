import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { UserReactionServiceBase } from "./base/userReaction.service.base";

@Injectable()
export class UserReactionService extends UserReactionServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
