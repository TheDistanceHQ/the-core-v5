import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntityWhereInput } from "./BaseEntityWhereInput";
import { Type } from "class-transformer";
import { BaseEntityOrderByInput } from "./BaseEntityOrderByInput";

@ArgsType()
class BaseEntityFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => BaseEntityWhereInput,
  })
  @Field(() => BaseEntityWhereInput, { nullable: true })
  @Type(() => BaseEntityWhereInput)
  where?: BaseEntityWhereInput;

  @ApiProperty({
    required: false,
    type: BaseEntityOrderByInput,
  })
  @Field(() => BaseEntityOrderByInput, { nullable: true })
  @Type(() => BaseEntityOrderByInput)
  orderBy?: BaseEntityOrderByInput;

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

export { BaseEntityFindManyArgs };
