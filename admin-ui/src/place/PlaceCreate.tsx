import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const PlaceCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Coordinate" source="coordinate" />
        <TextInput label="Title" source="title" />
      </SimpleForm>
    </Create>
  );
};
