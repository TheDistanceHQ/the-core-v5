import { Module } from "@nestjs/common";
import { NewsItemModuleBase } from "./base/newsItem.module.base";
import { NewsItemService } from "./newsItem.service";
import { NewsItemController } from "./newsItem.controller";
import { NewsItemResolver } from "./newsItem.resolver";

@Module({
  imports: [NewsItemModuleBase],
  controllers: [NewsItemController],
  providers: [NewsItemService, NewsItemResolver],
  exports: [NewsItemService],
})
export class NewsItemModule {}
