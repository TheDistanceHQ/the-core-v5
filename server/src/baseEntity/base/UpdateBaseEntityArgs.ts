import { ArgsType, Field } from "@nestjs/graphql";
import { BaseEntityWhereUniqueInput } from "./BaseEntityWhereUniqueInput";
import { BaseEntityUpdateInput } from "./BaseEntityUpdateInput";

@ArgsType()
class UpdateBaseEntityArgs {
  @Field(() => BaseEntityWhereUniqueInput, { nullable: false })
  where!: BaseEntityWhereUniqueInput;
  @Field(() => BaseEntityUpdateInput, { nullable: false })
  data!: BaseEntityUpdateInput;
}

export { UpdateBaseEntityArgs };
