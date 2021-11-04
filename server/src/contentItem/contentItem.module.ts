import { Module } from "@nestjs/common";
import { ContentItemModuleBase } from "./base/contentItem.module.base";
import { ContentItemService } from "./contentItem.service";
import { ContentItemController } from "./contentItem.controller";
import { ContentItemResolver } from "./contentItem.resolver";

@Module({
  imports: [ContentItemModuleBase],
  controllers: [ContentItemController],
  providers: [ContentItemService, ContentItemResolver],
  exports: [ContentItemService],
})
export class ContentItemModule {}
