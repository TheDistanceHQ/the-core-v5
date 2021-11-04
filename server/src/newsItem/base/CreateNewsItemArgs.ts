import { ArgsType, Field } from "@nestjs/graphql";
import { NewsItemCreateInput } from "./NewsItemCreateInput";

@ArgsType()
class CreateNewsItemArgs {
  @Field(() => NewsItemCreateInput, { nullable: false })
  data!: NewsItemCreateInput;
}

export { CreateNewsItemArgs };
