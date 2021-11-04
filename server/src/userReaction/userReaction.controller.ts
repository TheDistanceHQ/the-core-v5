import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { UserReactionService } from "./userReaction.service";
import { UserReactionControllerBase } from "./base/userReaction.controller.base";

@swagger.ApiTags("user-reactions")
@common.Controller("user-reactions")
export class UserReactionController extends UserReactionControllerBase {
  constructor(
    protected readonly service: UserReactionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
