import { ArgsType, Field } from "@nestjs/graphql";
import { BaseEntityWhereUniqueInput } from "./BaseEntityWhereUniqueInput";

@ArgsType()
class BaseEntityFindUniqueArgs {
  @Field(() => BaseEntityWhereUniqueInput, { nullable: false })
  where!: BaseEntityWhereUniqueInput;
}

export { BaseEntityFindUniqueArgs };
