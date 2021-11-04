import { Module } from "@nestjs/common";
import { UserReactionModuleBase } from "./base/userReaction.module.base";
import { UserReactionService } from "./userReaction.service";
import { UserReactionController } from "./userReaction.controller";
import { UserReactionResolver } from "./userReaction.resolver";

@Module({
  imports: [UserReactionModuleBase],
  controllers: [UserReactionController],
  providers: [UserReactionService, UserReactionResolver],
  exports: [UserReactionService],
})
export class UserReactionModule {}
