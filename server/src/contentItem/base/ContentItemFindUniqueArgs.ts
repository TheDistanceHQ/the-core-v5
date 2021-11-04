import { ArgsType, Field } from "@nestjs/graphql";
import { ContentItemWhereUniqueInput } from "./ContentItemWhereUniqueInput";

@ArgsType()
class ContentItemFindUniqueArgs {
  @Field(() => ContentItemWhereUniqueInput, { nullable: false })
  where!: ContentItemWhereUniqueInput;
}

export { ContentItemFindUniqueArgs };
