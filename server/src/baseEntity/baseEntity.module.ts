import { Module } from "@nestjs/common";
import { BaseEntityModuleBase } from "./base/baseEntity.module.base";
import { BaseEntityService } from "./baseEntity.service";
import { BaseEntityController } from "./baseEntity.controller";
import { BaseEntityResolver } from "./baseEntity.resolver";

@Module({
  imports: [BaseEntityModuleBase],
  controllers: [BaseEntityController],
  providers: [BaseEntityService, BaseEntityResolver],
  exports: [BaseEntityService],
})
export class BaseEntityModule {}
