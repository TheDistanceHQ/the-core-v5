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
import { CreateNewsItemArgs } from "./CreateNewsItemArgs";
import { UpdateNewsItemArgs } from "./UpdateNewsItemArgs";
import { DeleteNewsItemArgs } from "./DeleteNewsItemArgs";
import { NewsItemFindManyArgs } from "./NewsItemFindManyArgs";
import { NewsItemFindUniqueArgs } from "./NewsItemFindUniqueArgs";
import { NewsItem } from "./NewsItem";
import { NewsItemService } from "../newsItem.service";

@graphql.Resolver(() => NewsItem)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class NewsItemResolverBase {
  constructor(
    protected readonly service: NewsItemService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "NewsItem",
    action: "read",
    possession: "any",
  })
  async _newsItemsMeta(
    @graphql.Args() args: NewsItemFindManyArgs
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

  @graphql.Query(() => [NewsItem])
  @nestAccessControl.UseRoles({
    resource: "NewsItem",
    action: "read",
    possession: "any",
  })
  async newsItems(
    @graphql.Args() args: NewsItemFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<NewsItem[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "NewsItem",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => NewsItem, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "NewsItem",
    action: "read",
    possession: "own",
  })
  async newsItem(
    @graphql.Args() args: NewsItemFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<NewsItem | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "NewsItem",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => NewsItem)
  @nestAccessControl.UseRoles({
    resource: "NewsItem",
    action: "create",
    possession: "any",
  })
  async createNewsItem(
    @graphql.Args() args: CreateNewsItemArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<NewsItem> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "NewsItem",
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
        `providing the properties: ${properties} on ${"NewsItem"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => NewsItem)
  @nestAccessControl.UseRoles({
    resource: "NewsItem",
    action: "update",
    possession: "any",
  })
  async updateNewsItem(
    @graphql.Args() args: UpdateNewsItemArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<NewsItem | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "NewsItem",
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
        `providing the properties: ${properties} on ${"NewsItem"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => NewsItem)
  @nestAccessControl.UseRoles({
    resource: "NewsItem",
    action: "delete",
    possession: "any",
  })
  async deleteNewsItem(
    @graphql.Args() args: DeleteNewsItemArgs
  ): Promise<NewsItem | null> {
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
