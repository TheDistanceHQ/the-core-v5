import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { BaseEntityResolverBase } from "./base/baseEntity.resolver.base";
import { BaseEntity } from "./base/BaseEntity";
import { BaseEntityService } from "./baseEntity.service";

@graphql.Resolver(() => BaseEntity)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class BaseEntityResolver extends BaseEntityResolverBase {
  constructor(
    protected readonly service: BaseEntityService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
