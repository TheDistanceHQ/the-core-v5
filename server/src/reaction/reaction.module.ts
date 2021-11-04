import { Module } from "@nestjs/common";
import { ReactionModuleBase } from "./base/reaction.module.base";
import { ReactionService } from "./reaction.service";
import { ReactionController } from "./reaction.controller";
import { ReactionResolver } from "./reaction.resolver";

@Module({
  imports: [ReactionModuleBase],
  controllers: [ReactionController],
  providers: [ReactionService, ReactionResolver],
  exports: [ReactionService],
})
export class ReactionModule {}
