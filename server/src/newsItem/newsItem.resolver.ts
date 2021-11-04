import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { NewsItemResolverBase } from "./base/newsItem.resolver.base";
import { NewsItem } from "./base/NewsItem";
import { NewsItemService } from "./newsItem.service";

@graphql.Resolver(() => NewsItem)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class NewsItemResolver extends NewsItemResolverBase {
  constructor(
    protected readonly service: NewsItemService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
