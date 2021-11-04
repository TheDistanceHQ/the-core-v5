import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BaseEntityService } from "./baseEntity.service";
import { BaseEntityControllerBase } from "./base/baseEntity.controller.base";

@swagger.ApiTags("base-entities")
@common.Controller("base-entities")
export class BaseEntityController extends BaseEntityControllerBase {
  constructor(
    protected readonly service: BaseEntityService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
