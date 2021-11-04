import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ContentItemService } from "./contentItem.service";
import { ContentItemControllerBase } from "./base/contentItem.controller.base";

@swagger.ApiTags("content-items")
@common.Controller("content-items")
export class ContentItemController extends ContentItemControllerBase {
  constructor(
    protected readonly service: ContentItemService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
