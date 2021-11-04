import { ArgsType, Field } from "@nestjs/graphql";
import { NewsItemWhereUniqueInput } from "./NewsItemWhereUniqueInput";

@ArgsType()
class DeleteNewsItemArgs {
  @Field(() => NewsItemWhereUniqueInput, { nullable: false })
  where!: NewsItemWhereUniqueInput;
}

export { DeleteNewsItemArgs };
