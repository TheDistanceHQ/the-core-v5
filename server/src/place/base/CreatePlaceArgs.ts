import { ArgsType, Field } from "@nestjs/graphql";
import { PlaceCreateInput } from "./PlaceCreateInput";

@ArgsType()
class CreatePlaceArgs {
  @Field(() => PlaceCreateInput, { nullable: false })
  data!: PlaceCreateInput;
}

export { CreatePlaceArgs };
