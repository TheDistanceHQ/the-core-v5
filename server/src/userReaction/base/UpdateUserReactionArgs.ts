import { ArgsType, Field } from "@nestjs/graphql";
import { UserReactionWhereUniqueInput } from "./UserReactionWhereUniqueInput";
import { UserReactionUpdateInput } from "./UserReactionUpdateInput";

@ArgsType()
class UpdateUserReactionArgs {
  @Field(() => UserReactionWhereUniqueInput, { nullable: false })
  where!: UserReactionWhereUniqueInput;
  @Field(() => UserReactionUpdateInput, { nullable: false })
  data!: UserReactionUpdateInput;
}

export { UpdateUserReactionArgs };
