import { ArgsType, Field } from "@nestjs/graphql";
import { UserReactionWhereUniqueInput } from "./UserReactionWhereUniqueInput";

@ArgsType()
class DeleteUserReactionArgs {
  @Field(() => UserReactionWhereUniqueInput, { nullable: false })
  where!: UserReactionWhereUniqueInput;
}

export { DeleteUserReactionArgs };
