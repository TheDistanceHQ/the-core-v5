import { ArgsType, Field } from "@nestjs/graphql";
import { PlaceWhereUniqueInput } from "./PlaceWhereUniqueInput";

@ArgsType()
class PlaceFindUniqueArgs {
  @Field(() => PlaceWhereUniqueInput, { nullable: false })
  where!: PlaceWhereUniqueInput;
}

export { PlaceFindUniqueArgs };
