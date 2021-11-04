import { ArgsType, Field } from "@nestjs/graphql";
import { NewsItemWhereUniqueInput } from "./NewsItemWhereUniqueInput";

@ArgsType()
class NewsItemFindUniqueArgs {
  @Field(() => NewsItemWhereUniqueInput, { nullable: false })
  where!: NewsItemWhereUniqueInput;
}

export { NewsItemFindUniqueArgs };
