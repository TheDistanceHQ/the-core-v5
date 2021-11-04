import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { ReactionResolverBase } from "./base/reaction.resolver.base";
import { Reaction } from "./base/Reaction";
import { ReactionService } from "./reaction.service";

@graphql.Resolver(() => Reaction)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class ReactionResolver extends ReactionResolverBase {
  constructor(
    protected readonly service: ReactionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
