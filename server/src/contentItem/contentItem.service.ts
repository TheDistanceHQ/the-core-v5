import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ContentItemServiceBase } from "./base/contentItem.service.base";

@Injectable()
export class ContentItemService extends ContentItemServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
