import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { BaseEntityService } from "../baseEntity.service";
import { BaseEntityCreateInput } from "./BaseEntityCreateInput";
import { BaseEntityWhereInput } from "./BaseEntityWhereInput";
import { BaseEntityWhereUniqueInput } from "./BaseEntityWhereUniqueInput";
import { BaseEntityFindManyArgs } from "./BaseEntityFindManyArgs";
import { BaseEntityUpdateInput } from "./BaseEntityUpdateInput";
import { BaseEntity } from "./BaseEntity";
import { UserReactionWhereInput } from "../../userReaction/base/UserReactionWhereInput";
import { UserReaction } from "../../userReaction/base/UserReaction";
@swagger.ApiBearerAuth()
export class BaseEntityControllerBase {
  constructor(
    protected readonly service: BaseEntityService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "BaseEntity",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: BaseEntity })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: BaseEntityCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<BaseEntity> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "BaseEntity",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"BaseEntity"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: data,
      select: {
        createdAt: true,
        deletedAt: true,
        id: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "BaseEntity",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [BaseEntity] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => BaseEntityFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<BaseEntity[]> {
    const args = plainToClass(BaseEntityFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "BaseEntity",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        createdAt: true,
        deletedAt: true,
        id: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "BaseEntity",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: BaseEntity })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: BaseEntityWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<BaseEntity | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "BaseEntity",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,
        deletedAt: true,
        id: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "BaseEntity",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: BaseEntity })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: BaseEntityWhereUniqueInput,
    @common.Body()
    data: BaseEntityUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<BaseEntity | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "BaseEntity",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"BaseEntity"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          createdAt: true,
          deletedAt: true,
          id: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "BaseEntity",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: BaseEntity })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: BaseEntityWhereUniqueInput
  ): Promise<BaseEntity | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,
          deletedAt: true,
          id: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id/userReactions")
  @nestAccessControl.UseRoles({
    resource: "BaseEntity",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => UserReactionWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyUserReactions(
    @common.Req() request: Request,
    @common.Param() params: BaseEntityWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<UserReaction[]> {
    const query: UserReactionWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "UserReaction",
    });
    const results = await this.service.findUserReactions(params.id, {
      where: query,
      select: {
        createdAt: true,

        createdBy: {
          select: {
            id: true,
          },
        },

        entity: {
          select: {
            id: true,
          },
        },

        id: true,

        reaction: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/:id/userReactions")
  @nestAccessControl.UseRoles({
    resource: "BaseEntity",
    action: "update",
    possession: "any",
  })
  async createUserReactions(
    @common.Param() params: BaseEntityWhereUniqueInput,
    @common.Body() body: BaseEntityWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      userReactions: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "BaseEntity",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"BaseEntity"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id/userReactions")
  @nestAccessControl.UseRoles({
    resource: "BaseEntity",
    action: "update",
    possession: "any",
  })
  async updateUserReactions(
    @common.Param() params: BaseEntityWhereUniqueInput,
    @common.Body() body: BaseEntityWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      userReactions: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "BaseEntity",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"BaseEntity"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id/userReactions")
  @nestAccessControl.UseRoles({
    resource: "BaseEntity",
    action: "update",
    possession: "any",
  })
  async deleteUserReactions(
    @common.Param() params: BaseEntityWhereUniqueInput,
    @common.Body() body: BaseEntityWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      userReactions: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "BaseEntity",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"BaseEntity"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
