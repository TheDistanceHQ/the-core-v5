import { ArgsType, Field } from "@nestjs/graphql";
import { BaseEntityCreateInput } from "./BaseEntityCreateInput";

@ArgsType()
class CreateBaseEntityArgs {
  @Field(() => BaseEntityCreateInput, { nullable: false })
  data!: BaseEntityCreateInput;
}

export { CreateBaseEntityArgs };
