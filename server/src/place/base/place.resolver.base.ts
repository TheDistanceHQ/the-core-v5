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
import { CreatePlaceArgs } from "./CreatePlaceArgs";
import { UpdatePlaceArgs } from "./UpdatePlaceArgs";
import { DeletePlaceArgs } from "./DeletePlaceArgs";
import { PlaceFindManyArgs } from "./PlaceFindManyArgs";
import { PlaceFindUniqueArgs } from "./PlaceFindUniqueArgs";
import { Place } from "./Place";
import { PlaceService } from "../place.service";

@graphql.Resolver(() => Place)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class PlaceResolverBase {
  constructor(
    protected readonly service: PlaceService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Place",
    action: "read",
    possession: "any",
  })
  async _placesMeta(
    @graphql.Args() args: PlaceFindManyArgs
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

  @graphql.Query(() => [Place])
  @nestAccessControl.UseRoles({
    resource: "Place",
    action: "read",
    possession: "any",
  })
  async places(
    @graphql.Args() args: PlaceFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Place[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Place",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Place, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Place",
    action: "read",
    possession: "own",
  })
  async place(
    @graphql.Args() args: PlaceFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Place | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Place",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Place)
  @nestAccessControl.UseRoles({
    resource: "Place",
    action: "create",
    possession: "any",
  })
  async createPlace(
    @graphql.Args() args: CreatePlaceArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Place> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Place",
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
        `providing the properties: ${properties} on ${"Place"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Place)
  @nestAccessControl.UseRoles({
    resource: "Place",
    action: "update",
    possession: "any",
  })
  async updatePlace(
    @graphql.Args() args: UpdatePlaceArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Place | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Place",
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
        `providing the properties: ${properties} on ${"Place"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Place)
  @nestAccessControl.UseRoles({
    resource: "Place",
    action: "delete",
    possession: "any",
  })
  async deletePlace(
    @graphql.Args() args: DeletePlaceArgs
  ): Promise<Place | null> {
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
