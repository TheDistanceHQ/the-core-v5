import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const ContentItemEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Content" multiline source="content" />
        <TextInput label="Summary" source="summary" />
        <TextInput label="Title" source="title" />
        <TextInput label="TitleMediaUrl" source="titleMediaUrl" />
      </SimpleForm>
    </Edit>
  );
};
