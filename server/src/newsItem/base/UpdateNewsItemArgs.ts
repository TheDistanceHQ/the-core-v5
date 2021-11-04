import { ArgsType, Field } from "@nestjs/graphql";
import { NewsItemWhereUniqueInput } from "./NewsItemWhereUniqueInput";
import { NewsItemUpdateInput } from "./NewsItemUpdateInput";

@ArgsType()
class UpdateNewsItemArgs {
  @Field(() => NewsItemWhereUniqueInput, { nullable: false })
  where!: NewsItemWhereUniqueInput;
  @Field(() => NewsItemUpdateInput, { nullable: false })
  data!: NewsItemUpdateInput;
}

export { UpdateNewsItemArgs };
