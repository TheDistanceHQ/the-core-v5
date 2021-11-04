import { Module } from "@nestjs/common";
import { PlaceModuleBase } from "./base/place.module.base";
import { PlaceService } from "./place.service";
import { PlaceController } from "./place.controller";
import { PlaceResolver } from "./place.resolver";

@Module({
  imports: [PlaceModuleBase],
  controllers: [PlaceController],
  providers: [PlaceService, PlaceResolver],
  exports: [PlaceService],
})
export class PlaceModule {}
