import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntityWhereUniqueInput } from "../../baseEntity/base/BaseEntityWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { StringFilter } from "../../util/StringFilter";
import { ReactionWhereUniqueInput } from "../../reaction/base/ReactionWhereUniqueInput";
@InputType()
class UserReactionWhereInput {
  @ApiProperty({
    required: false,
    type: () => BaseEntityWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => BaseEntityWhereUniqueInput)
  @IsOptional()
  @Field(() => BaseEntityWhereUniqueInput, {
    nullable: true,
  })
  entity?: BaseEntityWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  id?: StringFilter;

  @ApiProperty({
    required: false,
    type: () => ReactionWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ReactionWhereUniqueInput)
  @IsOptional()
  @Field(() => ReactionWhereUniqueInput, {
    nullable: true,
  })
  reaction?: ReactionWhereUniqueInput;
}
export { UserReactionWhereInput };
