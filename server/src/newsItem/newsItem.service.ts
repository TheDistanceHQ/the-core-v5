import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { NewsItemServiceBase } from "./base/newsItem.service.base";

@Injectable()
export class NewsItemService extends NewsItemServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
