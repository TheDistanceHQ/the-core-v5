import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PlaceWhereInput } from "./PlaceWhereInput";
import { Type } from "class-transformer";
import { PlaceOrderByInput } from "./PlaceOrderByInput";

@ArgsType()
class PlaceFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => PlaceWhereInput,
  })
  @Field(() => PlaceWhereInput, { nullable: true })
  @Type(() => PlaceWhereInput)
  where?: PlaceWhereInput;

  @ApiProperty({
    required: false,
    type: PlaceOrderByInput,
  })
  @Field(() => PlaceOrderByInput, { nullable: true })
  @Type(() => PlaceOrderByInput)
  orderBy?: PlaceOrderByInput;

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

export { PlaceFindManyArgs };
