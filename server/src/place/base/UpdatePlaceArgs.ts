import { ArgsType, Field } from "@nestjs/graphql";
import { PlaceWhereUniqueInput } from "./PlaceWhereUniqueInput";
import { PlaceUpdateInput } from "./PlaceUpdateInput";

@ArgsType()
class UpdatePlaceArgs {
  @Field(() => PlaceWhereUniqueInput, { nullable: false })
  where!: PlaceWhereUniqueInput;
  @Field(() => PlaceUpdateInput, { nullable: false })
  data!: PlaceUpdateInput;
}

export { UpdatePlaceArgs };
