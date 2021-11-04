import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserReactionWhereInput } from "./UserReactionWhereInput";
import { Type } from "class-transformer";
import { UserReactionOrderByInput } from "./UserReactionOrderByInput";

@ArgsType()
class UserReactionFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => UserReactionWhereInput,
  })
  @Field(() => UserReactionWhereInput, { nullable: true })
  @Type(() => UserReactionWhereInput)
  where?: UserReactionWhereInput;

  @ApiProperty({
    required: false,
    type: UserReactionOrderByInput,
  })
  @Field(() => UserReactionOrderByInput, { nullable: true })
  @Type(() => UserReactionOrderByInput)
  orderBy?: UserReactionOrderByInput;

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

export { UserReactionFindManyArgs };
