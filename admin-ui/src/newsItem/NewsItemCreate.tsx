import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  DateTimeInput,
} from "react-admin";

export const NewsItemCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Content" source="content" />
        <DateTimeInput label="Published At" source="publishedAt" />
        <TextInput label="Summary" source="summary" />
        <TextInput label="Title" source="title" />
        <TextInput label="TitleMediaUrl" source="titleMediaUrl" />
      </SimpleForm>
    </Create>
  );
};
