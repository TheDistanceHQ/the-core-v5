import { ArgsType, Field } from "@nestjs/graphql";
import { ContentItemWhereUniqueInput } from "./ContentItemWhereUniqueInput";
import { ContentItemUpdateInput } from "./ContentItemUpdateInput";

@ArgsType()
class UpdateContentItemArgs {
  @Field(() => ContentItemWhereUniqueInput, { nullable: false })
  where!: ContentItemWhereUniqueInput;
  @Field(() => ContentItemUpdateInput, { nullable: false })
  data!: ContentItemUpdateInput;
}

export { UpdateContentItemArgs };
