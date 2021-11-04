import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ReactionServiceBase } from "./base/reaction.service.base";

@Injectable()
export class ReactionService extends ReactionServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
