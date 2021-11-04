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
import { UserReactionService } from "../userReaction.service";
import { UserReactionCreateInput } from "./UserReactionCreateInput";
import { UserReactionWhereInput } from "./UserReactionWhereInput";
import { UserReactionWhereUniqueInput } from "./UserReactionWhereUniqueInput";
import { UserReactionFindManyArgs } from "./UserReactionFindManyArgs";
import { UserReactionUpdateInput } from "./UserReactionUpdateInput";
import { UserReaction } from "./UserReaction";
@swagger.ApiBearerAuth()
export class UserReactionControllerBase {
  constructor(
    protected readonly service: UserReactionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "UserReaction",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: UserReaction })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: UserReactionCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<UserReaction> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "UserReaction",
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
        `providing the properties: ${properties} on ${"UserReaction"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        createdBy: data.createdBy
          ? {
              connect: data.createdBy,
            }
          : undefined,

        entity: data.entity
          ? {
              connect: data.entity,
            }
          : undefined,

        reaction: data.reaction
          ? {
              connect: data.reaction,
            }
          : undefined,
      },
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
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "UserReaction",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [UserReaction] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => UserReactionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<UserReaction[]> {
    const args = plainToClass(UserReactionFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "UserReaction",
    });
    const results = await this.service.findMany({
      ...args,
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
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "UserReaction",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: UserReaction })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: UserReactionWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<UserReaction | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "UserReaction",
    });
    const result = await this.service.findOne({
      where: params,
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
    resource: "UserReaction",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: UserReaction })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: UserReactionWhereUniqueInput,
    @common.Body()
    data: UserReactionUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<UserReaction | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "UserReaction",
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
        `providing the properties: ${properties} on ${"UserReaction"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          createdBy: data.createdBy
            ? {
                connect: data.createdBy,
              }
            : undefined,

          entity: data.entity
            ? {
                connect: data.entity,
              }
            : undefined,

          reaction: data.reaction
            ? {
                connect: data.reaction,
              }
            : undefined,
        },
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
    resource: "UserReaction",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: UserReaction })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: UserReactionWhereUniqueInput
  ): Promise<UserReaction | null> {
    try {
      return await this.service.delete({
        where: params,
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
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
