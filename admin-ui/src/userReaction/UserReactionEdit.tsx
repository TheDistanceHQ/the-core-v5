import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { UserTitle } from "../user/UserTitle";
import { BaseEntityTitle } from "../baseEntity/BaseEntityTitle";
import { ReactionTitle } from "../reaction/ReactionTitle";

export const UserReactionEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceInput source="user.id" reference="User" label="Created By">
          <SelectInput optionText={UserTitle} />
        </ReferenceInput>
        <ReferenceInput
          source="baseentity.id"
          reference="BaseEntity"
          label="Entity"
        >
          <SelectInput optionText={BaseEntityTitle} />
        </ReferenceInput>
        <ReferenceInput
          source="reaction.id"
          reference="Reaction"
          label="Reaction"
        >
          <SelectInput optionText={ReactionTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};
