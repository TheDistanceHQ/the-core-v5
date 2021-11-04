import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { NewsItemWhereInput } from "./NewsItemWhereInput";
import { Type } from "class-transformer";
import { NewsItemOrderByInput } from "./NewsItemOrderByInput";

@ArgsType()
class NewsItemFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => NewsItemWhereInput,
  })
  @Field(() => NewsItemWhereInput, { nullable: true })
  @Type(() => NewsItemWhereInput)
  where?: NewsItemWhereInput;

  @ApiProperty({
    required: false,
    type: NewsItemOrderByInput,
  })
  @Field(() => NewsItemOrderByInput, { nullable: true })
  @Type(() => NewsItemOrderByInput)
  orderBy?: NewsItemOrderByInput;

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

export { NewsItemFindManyArgs };
