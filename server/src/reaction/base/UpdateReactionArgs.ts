import { ArgsType, Field } from "@nestjs/graphql";
import { ReactionWhereUniqueInput } from "./ReactionWhereUniqueInput";
import { ReactionUpdateInput } from "./ReactionUpdateInput";

@ArgsType()
class UpdateReactionArgs {
  @Field(() => ReactionWhereUniqueInput, { nullable: false })
  where!: ReactionWhereUniqueInput;
  @Field(() => ReactionUpdateInput, { nullable: false })
  data!: ReactionUpdateInput;
}

export { UpdateReactionArgs };
