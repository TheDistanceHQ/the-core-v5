import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, ValidateNested, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { User } from "../../user/base/User";
import { BaseEntity } from "../../baseEntity/base/BaseEntity";
import { Reaction } from "../../reaction/base/Reaction";
@ObjectType()
class UserReaction {
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: false,
    type: () => User,
  })
  @ValidateNested()
  @Type(() => User)
  @IsOptional()
  createdBy?: User | null;

  @ApiProperty({
    required: false,
    type: () => BaseEntity,
  })
  @ValidateNested()
  @Type(() => BaseEntity)
  @IsOptional()
  entity?: BaseEntity | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
    type: () => Reaction,
  })
  @ValidateNested()
  @Type(() => Reaction)
  @IsOptional()
  reaction?: Reaction | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { UserReaction };
