import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ReactionWhereInput } from "./ReactionWhereInput";
import { Type } from "class-transformer";
import { ReactionOrderByInput } from "./ReactionOrderByInput";

@ArgsType()
class ReactionFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ReactionWhereInput,
  })
  @Field(() => ReactionWhereInput, { nullable: true })
  @Type(() => ReactionWhereInput)
  where?: ReactionWhereInput;

  @ApiProperty({
    required: false,
    type: ReactionOrderByInput,
  })
  @Field(() => ReactionOrderByInput, { nullable: true })
  @Type(() => ReactionOrderByInput)
  orderBy?: ReactionOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { ReactionFindManyArgs };
