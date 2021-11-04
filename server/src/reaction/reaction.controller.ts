import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ReactionService } from "./reaction.service";
import { ReactionControllerBase } from "./base/reaction.controller.base";

@swagger.ApiTags("reactions")
@common.Controller("reactions")
export class ReactionController extends ReactionControllerBase {
  constructor(
    protected readonly service: ReactionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
