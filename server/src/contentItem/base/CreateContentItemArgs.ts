import { ArgsType, Field } from "@nestjs/graphql";
import { ContentItemCreateInput } from "./ContentItemCreateInput";

@ArgsType()
class CreateContentItemArgs {
  @Field(() => ContentItemCreateInput, { nullable: false })
  data!: ContentItemCreateInput;
}

export { CreateContentItemArgs };
