import { ArgsType, Field } from "@nestjs/graphql";
import { UserReactionWhereUniqueInput } from "./UserReactionWhereUniqueInput";

@ArgsType()
class UserReactionFindUniqueArgs {
  @Field(() => UserReactionWhereUniqueInput, { nullable: false })
  where!: UserReactionWhereUniqueInput;
}

export { UserReactionFindUniqueArgs };
