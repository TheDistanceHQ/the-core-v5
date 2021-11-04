import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { ContentItemResolverBase } from "./base/contentItem.resolver.base";
import { ContentItem } from "./base/ContentItem";
import { ContentItemService } from "./contentItem.service";

@graphql.Resolver(() => ContentItem)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class ContentItemResolver extends ContentItemResolverBase {
  constructor(
    protected readonly service: ContentItemService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
