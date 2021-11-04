import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { UserReactionResolverBase } from "./base/userReaction.resolver.base";
import { UserReaction } from "./base/UserReaction";
import { UserReactionService } from "./userReaction.service";

@graphql.Resolver(() => UserReaction)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class UserReactionResolver extends UserReactionResolverBase {
  constructor(
    protected readonly service: UserReactionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
