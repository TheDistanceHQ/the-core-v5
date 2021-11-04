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
import { CreateReactionArgs } from "./CreateReactionArgs";
import { UpdateReactionArgs } from "./UpdateReactionArgs";
import { DeleteReactionArgs } from "./DeleteReactionArgs";
import { ReactionFindManyArgs } from "./ReactionFindManyArgs";
import { ReactionFindUniqueArgs } from "./ReactionFindUniqueArgs";
import { Reaction } from "./Reaction";
import { UserReactionFindManyArgs } from "../../userReaction/base/UserReactionFindManyArgs";
import { UserReaction } from "../../userReaction/base/UserReaction";
import { ReactionService } from "../reaction.service";

@graphql.Resolver(() => Reaction)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class ReactionResolverBase {
  constructor(
    protected readonly service: ReactionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Reaction",
    action: "read",
    possession: "any",
  })
  async _reactionsMeta(
    @graphql.Args() args: ReactionFindManyArgs
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

  @graphql.Query(() => [Reaction])
  @nestAccessControl.UseRoles({
    resource: "Reaction",
    action: "read",
    possession: "any",
  })
  async reactions(
    @graphql.Args() args: ReactionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Reaction[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Reaction",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Reaction, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Reaction",
    action: "read",
    possession: "own",
  })
  async reaction(
    @graphql.Args() args: ReactionFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Reaction | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Reaction",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Reaction)
  @nestAccessControl.UseRoles({
    resource: "Reaction",
    action: "create",
    possession: "any",
  })
  async createReaction(
    @graphql.Args() args: CreateReactionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Reaction> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Reaction",
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
        `providing the properties: ${properties} on ${"Reaction"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Reaction)
  @nestAccessControl.UseRoles({
    resource: "Reaction",
    action: "update",
    possession: "any",
  })
  async updateReaction(
    @graphql.Args() args: UpdateReactionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Reaction | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Reaction",
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
        `providing the properties: ${properties} on ${"Reaction"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Reaction)
  @nestAccessControl.UseRoles({
    resource: "Reaction",
    action: "delete",
    possession: "any",
  })
  async deleteReaction(
    @graphql.Args() args: DeleteReactionArgs
  ): Promise<Reaction | null> {
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
    resource: "Reaction",
    action: "read",
    possession: "any",
  })
  async userReactions(
    @graphql.Parent() parent: Reaction,
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
