import { ArgsType, Field } from "@nestjs/graphql";
import { ContentItemWhereUniqueInput } from "./ContentItemWhereUniqueInput";

@ArgsType()
class DeleteContentItemArgs {
  @Field(() => ContentItemWhereUniqueInput, { nullable: false })
  where!: ContentItemWhereUniqueInput;
}

export { DeleteContentItemArgs };
