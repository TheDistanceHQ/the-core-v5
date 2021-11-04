import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ContentItemWhereInput } from "./ContentItemWhereInput";
import { Type } from "class-transformer";
import { ContentItemOrderByInput } from "./ContentItemOrderByInput";

@ArgsType()
class ContentItemFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ContentItemWhereInput,
  })
  @Field(() => ContentItemWhereInput, { nullable: true })
  @Type(() => ContentItemWhereInput)
  where?: ContentItemWhereInput;

  @ApiProperty({
    required: false,
    type: ContentItemOrderByInput,
  })
  @Field(() => ContentItemOrderByInput, { nullable: true })
  @Type(() => ContentItemOrderByInput)
  orderBy?: ContentItemOrderByInput;

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

export { ContentItemFindManyArgs };
