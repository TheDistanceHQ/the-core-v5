import { ArgsType, Field } from "@nestjs/graphql";
import { UserReactionCreateInput } from "./UserReactionCreateInput";

@ArgsType()
class CreateUserReactionArgs {
  @Field(() => UserReactionCreateInput, { nullable: false })
  data!: UserReactionCreateInput;
}

export { CreateUserReactionArgs };
