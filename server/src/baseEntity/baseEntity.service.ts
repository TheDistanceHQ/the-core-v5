import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { BaseEntityServiceBase } from "./base/baseEntity.service.base";

@Injectable()
export class BaseEntityService extends BaseEntityServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
