import { ArgsType, Field } from "@nestjs/graphql";
import { ReactionWhereUniqueInput } from "./ReactionWhereUniqueInput";

@ArgsType()
class ReactionFindUniqueArgs {
  @Field(() => ReactionWhereUniqueInput, { nullable: false })
  where!: ReactionWhereUniqueInput;
}

export { ReactionFindUniqueArgs };
