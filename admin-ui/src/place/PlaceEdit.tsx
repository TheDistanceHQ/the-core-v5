import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const PlaceEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Coordinate" source="coordinate" />
        <TextInput label="Title" source="title" />
      </SimpleForm>
    </Edit>
  );
};
