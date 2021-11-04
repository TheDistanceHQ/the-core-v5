import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const ContentItemCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Content" multiline source="content" />
        <TextInput label="Summary" source="summary" />
        <TextInput label="Title" source="title" />
        <TextInput label="TitleMediaUrl" source="titleMediaUrl" />
      </SimpleForm>
    </Create>
  );
};
