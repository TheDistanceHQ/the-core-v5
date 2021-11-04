import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  DateTimeInput,
} from "react-admin";

export const NewsItemEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Content" source="content" />
        <DateTimeInput label="Published At" source="publishedAt" />
        <TextInput label="Summary" source="summary" />
        <TextInput label="Title" source="title" />
        <TextInput label="TitleMediaUrl" source="titleMediaUrl" />
      </SimpleForm>
    </Edit>
  );
};
