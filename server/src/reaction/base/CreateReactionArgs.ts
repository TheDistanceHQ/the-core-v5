import { ArgsType, Field } from "@nestjs/graphql";
import { ReactionCreateInput } from "./ReactionCreateInput";

@ArgsType()
class CreateReactionArgs {
  @Field(() => ReactionCreateInput, { nullable: false })
  data!: ReactionCreateInput;
}

export { CreateReactionArgs };
