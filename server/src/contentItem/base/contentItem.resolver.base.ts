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
import { CreateContentItemArgs } from "./CreateContentItemArgs";
import { UpdateContentItemArgs } from "./UpdateContentItemArgs";
import { DeleteContentItemArgs } from "./DeleteContentItemArgs";
import { ContentItemFindManyArgs } from "./ContentItemFindManyArgs";
import { ContentItemFindUniqueArgs } from "./ContentItemFindUniqueArgs";
import { ContentItem } from "./ContentItem";
import { ContentItemService } from "../contentItem.service";

@graphql.Resolver(() => ContentItem)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class ContentItemResolverBase {
  constructor(
    protected readonly service: ContentItemService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "ContentItem",
    action: "read",
    possession: "any",
  })
  async _contentItemsMeta(
    @graphql.Args() args: ContentItemFindManyArgs
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

  @graphql.Query(() => [ContentItem])
  @nestAccessControl.UseRoles({
    resource: "ContentItem",
    action: "read",
    possession: "any",
  })
  async contentItems(
    @graphql.Args() args: ContentItemFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ContentItem[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "ContentItem",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => ContentItem, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "ContentItem",
    action: "read",
    possession: "own",
  })
  async contentItem(
    @graphql.Args() args: ContentItemFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ContentItem | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "ContentItem",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => ContentItem)
  @nestAccessControl.UseRoles({
    resource: "ContentItem",
    action: "create",
    possession: "any",
  })
  async createContentItem(
    @graphql.Args() args: CreateContentItemArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ContentItem> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "ContentItem",
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
        `providing the properties: ${properties} on ${"ContentItem"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => ContentItem)
  @nestAccessControl.UseRoles({
    resource: "ContentItem",
    action: "update",
    possession: "any",
  })
  async updateContentItem(
    @graphql.Args() args: UpdateContentItemArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ContentItem | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ContentItem",
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
        `providing the properties: ${properties} on ${"ContentItem"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => ContentItem)
  @nestAccessControl.UseRoles({
    resource: "ContentItem",
    action: "delete",
    possession: "any",
  })
  async deleteContentItem(
    @graphql.Args() args: DeleteContentItemArgs
  ): Promise<ContentItem | null> {
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
}
