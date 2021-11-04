import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateBaseEntityArgs } from "./CreateBaseEntityArgs";
import { UpdateBaseEntityArgs } from "./UpdateBaseEntityArgs";
import { DeleteBaseEntityArgs } from "./DeleteBaseEntityArgs";
import { BaseEntityFindManyArgs } from "./BaseEntityFindManyArgs";
import { BaseEntityFindUniqueArgs } from "./BaseEntityFindUniqueArgs";
import { BaseEntity } from "./BaseEntity";
import { UserReactionFindManyArgs } from "../../userReaction/base/UserReactionFindManyArgs";
import { UserReaction } from "../../userReaction/base/UserReaction";
import { BaseEntityService } from "../baseEntity.service";

@graphql.Resolver(() => BaseEntity)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class BaseEntityResolverBase {
  constructor(
    protected readonly service: BaseEntityService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "BaseEntity",
    action: "read",
    possession: "any",
  })
  async _baseEntitiesMeta(
    @graphql.Args() args: BaseEntityFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [BaseEntity])
  @nestAccessControl.UseRoles({
    resource: "BaseEntity",
    action: "read",
    possession: "any",
  })
  async baseEntities(
    @graphql.Args() args: BaseEntityFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<BaseEntity[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "BaseEntity",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => BaseEntity, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "BaseEntity",
    action: "read",
    possession: "own",
  })
  async baseEntity(
    @graphql.Args() args: BaseEntityFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<BaseEntity | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "BaseEntity",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => BaseEntity)
  @nestAccessControl.UseRoles({
    resource: "BaseEntity",
    action: "create",
    possession: "any",
  })
  async createBaseEntity(
    @graphql.Args() args: CreateBaseEntityArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<BaseEntity> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "BaseEntity",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"BaseEntity"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => BaseEntity)
  @nestAccessControl.UseRoles({
    resource: "BaseEntity",
    action: "update",
    possession: "any",
  })
  async updateBaseEntity(
    @graphql.Args() args: UpdateBaseEntityArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<BaseEntity | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "BaseEntity",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"BaseEntity"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => BaseEntity)
  @nestAccessControl.UseRoles({
    resource: "BaseEntity",
    action: "delete",
    possession: "any",
  })
  async deleteBaseEntity(
    @graphql.Args() args: DeleteBaseEntityArgs
  ): Promise<BaseEntity | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => [UserReaction])
  @nestAccessControl.UseRoles({
    resource: "BaseEntity",
    action: "read",
    possession: "any",
  })
  async userReactions(
    @graphql.Parent() parent: BaseEntity,
    @graphql.Args() args: UserReactionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<UserReaction[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "UserReaction",
    });
    const results = await this.service.findUserReactions(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }
}
