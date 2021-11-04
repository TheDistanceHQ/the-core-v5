import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { BaseEntityWhereUniqueInput } from "../../baseEntity/base/BaseEntityWhereUniqueInput";
import { ReactionWhereUniqueInput } from "../../reaction/base/ReactionWhereUniqueInput";
@InputType()
class UserReactionCreateInput {
  @ApiProperty({
    required: false,
    type: () => UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  @Field(() => UserWhereUniqueInput, {
    nullable: true,
  })
  createdBy?: UserWhereUniqueInput | null;

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
  entity?: BaseEntityWhereUniqueInput | null;

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
  reaction?: ReactionWhereUniqueInput | null;
}
export { UserReactionCreateInput };
