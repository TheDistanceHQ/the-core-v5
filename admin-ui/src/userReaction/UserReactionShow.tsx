import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  ReferenceField,
  TextField,
} from "react-admin";
import { USER_TITLE_FIELD } from "../user/UserTitle";
import { BASEENTITY_TITLE_FIELD } from "../baseEntity/BaseEntityTitle";
import { REACTION_TITLE_FIELD } from "../reaction/ReactionTitle";

export const UserReactionShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <ReferenceField label="Created By" source="user.id" reference="User">
          <TextField source={USER_TITLE_FIELD} />
        </ReferenceField>
        <ReferenceField
          label="Entity"
          source="baseentity.id"
          reference="BaseEntity"
        >
          <TextField source={BASEENTITY_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="ID" source="id" />
        <ReferenceField
          label="Reaction"
          source="reaction.id"
          reference="Reaction"
        >
          <TextField source={REACTION_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="updatedAt" label="Updated At" />
      </SimpleShowLayout>
    </Show>
  );
};
