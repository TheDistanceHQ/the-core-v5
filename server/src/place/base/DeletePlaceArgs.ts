import { ArgsType, Field } from "@nestjs/graphql";
import { PlaceWhereUniqueInput } from "./PlaceWhereUniqueInput";

@ArgsType()
class DeletePlaceArgs {
  @Field(() => PlaceWhereUniqueInput, { nullable: false })
  where!: PlaceWhereUniqueInput;
}

export { DeletePlaceArgs };
