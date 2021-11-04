import { ArgsType, Field } from "@nestjs/graphql";
import { BaseEntityWhereUniqueInput } from "./BaseEntityWhereUniqueInput";

@ArgsType()
class DeleteBaseEntityArgs {
  @Field(() => BaseEntityWhereUniqueInput, { nullable: false })
  where!: BaseEntityWhereUniqueInput;
}

export { DeleteBaseEntityArgs };
