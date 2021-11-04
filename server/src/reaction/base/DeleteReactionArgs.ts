import { ArgsType, Field } from "@nestjs/graphql";
import { ReactionWhereUniqueInput } from "./ReactionWhereUniqueInput";

@ArgsType()
class DeleteReactionArgs {
  @Field(() => ReactionWhereUniqueInput, { nullable: false })
  where!: ReactionWhereUniqueInput;
}

export { DeleteReactionArgs };
