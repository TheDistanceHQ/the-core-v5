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
import { CreateUserReactionArgs } from "./CreateUserReactionArgs";
import { UpdateUserReactionArgs } from "./UpdateUserReactionArgs";
import { DeleteUserReactionArgs } from "./DeleteUserReactionArgs";
import { UserReactionFindManyArgs } from "./UserReactionFindManyArgs";
import { UserReactionFindUniqueArgs } from "./UserReactionFindUniqueArgs";
import { UserReaction } from "./UserReaction";
import { User } from "../../user/base/User";
import { BaseEntity } from "../../baseEntity/base/BaseEntity";
import { Reaction } from "../../reaction/base/Reaction";
import { UserReactionService } from "../userReaction.service";

@graphql.Resolver(() => UserReaction)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class UserReactionResolverBase {
  constructor(
    protected readonly service: UserReactionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "UserReaction",
    action: "read",
    possession: "any",
  })
  async _userReactionsMeta(
    @graphql.Args() args: UserReactionFindManyArgs
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

  @graphql.Query(() => [UserReaction])
  @nestAccessControl.UseRoles({
    resource: "UserReaction",
    action: "read",
    possession: "any",
  })
  async userReactions(
    @graphql.Args() args: UserReactionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<UserReaction[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "UserReaction",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => UserReaction, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "UserReaction",
    action: "read",
    possession: "own",
  })
  async userReaction(
    @graphql.Args() args: UserReactionFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<UserReaction | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "UserReaction",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => UserReaction)
  @nestAccessControl.UseRoles({
    resource: "UserReaction",
    action: "create",
    possession: "any",
  })
  async createUserReaction(
    @graphql.Args() args: CreateUserReactionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<UserReaction> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "UserReaction",
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
        `providing the properties: ${properties} on ${"UserReaction"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        createdBy: args.data.createdBy
          ? {
              connect: args.data.createdBy,
            }
          : undefined,

        entity: args.data.entity
          ? {
              connect: args.data.entity,
            }
          : undefined,

        reaction: args.data.reaction
          ? {
              connect: args.data.reaction,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => UserReaction)
  @nestAccessControl.UseRoles({
    resource: "UserReaction",
    action: "update",
    possession: "any",
  })
  async updateUserReaction(
    @graphql.Args() args: UpdateUserReactionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<UserReaction | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "UserReaction",
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
        `providing the properties: ${properties} on ${"UserReaction"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          createdBy: args.data.createdBy
            ? {
                connect: args.data.createdBy,
              }
            : undefined,

          entity: args.data.entity
            ? {
                connect: args.data.entity,
              }
            : undefined,

          reaction: args.data.reaction
            ? {
                connect: args.data.reaction,
              }
            : undefined,
        },
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

  @graphql.Mutation(() => UserReaction)
  @nestAccessControl.UseRoles({
    resource: "UserReaction",
    action: "delete",
    possession: "any",
  })
  async deleteUserReaction(
    @graphql.Args() args: DeleteUserReactionArgs
  ): Promise<UserReaction | null> {
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

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "UserReaction",
    action: "read",
    possession: "any",
  })
  async createdBy(
    @graphql.Parent() parent: UserReaction,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service.getCreatedBy(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => BaseEntity, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "UserReaction",
    action: "read",
    possession: "any",
  })
  async entity(
    @graphql.Parent() parent: UserReaction,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<BaseEntity | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "BaseEntity",
    });
    const result = await this.service.getEntity(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Reaction, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "UserReaction",
    action: "read",
    possession: "any",
  })
  async reaction(
    @graphql.Parent() parent: UserReaction,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Reaction | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Reaction",
    });
    const result = await this.service.getReaction(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
