import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { UserShow } from "./user/UserShow";
import { BaseEntityList } from "./baseEntity/BaseEntityList";
import { BaseEntityCreate } from "./baseEntity/BaseEntityCreate";
import { BaseEntityEdit } from "./baseEntity/BaseEntityEdit";
import { BaseEntityShow } from "./baseEntity/BaseEntityShow";
import { ContentItemList } from "./contentItem/ContentItemList";
import { ContentItemCreate } from "./contentItem/ContentItemCreate";
import { ContentItemEdit } from "./contentItem/ContentItemEdit";
import { ContentItemShow } from "./contentItem/ContentItemShow";
import { PlaceList } from "./place/PlaceList";
import { PlaceCreate } from "./place/PlaceCreate";
import { PlaceEdit } from "./place/PlaceEdit";
import { PlaceShow } from "./place/PlaceShow";
import { NewsItemList } from "./newsItem/NewsItemList";
import { NewsItemCreate } from "./newsItem/NewsItemCreate";
import { NewsItemEdit } from "./newsItem/NewsItemEdit";
import { NewsItemShow } from "./newsItem/NewsItemShow";
import { CommentList } from "./comment/CommentList";
import { CommentCreate } from "./comment/CommentCreate";
import { CommentEdit } from "./comment/CommentEdit";
import { CommentShow } from "./comment/CommentShow";
import { ReactionList } from "./reaction/ReactionList";
import { ReactionCreate } from "./reaction/ReactionCreate";
import { ReactionEdit } from "./reaction/ReactionEdit";
import { ReactionShow } from "./reaction/ReactionShow";
import { UserReactionList } from "./userReaction/UserReactionList";
import { UserReactionCreate } from "./userReaction/UserReactionCreate";
import { UserReactionEdit } from "./userReaction/UserReactionEdit";
import { UserReactionShow } from "./userReaction/UserReactionShow";
import { ProductList } from "./product/ProductList";
import { ProductCreate } from "./product/ProductCreate";
import { ProductEdit } from "./product/ProductEdit";
import { ProductShow } from "./product/ProductShow";
import { jwtAuthProvider } from "./auth-provider/ra-auth-jwt";

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <Admin
        title={"My app"}
        dataProvider={dataProvider}
        authProvider={jwtAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="User"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          show={UserShow}
        />
        <Resource
          name="BaseEntity"
          list={BaseEntityList}
          edit={BaseEntityEdit}
          create={BaseEntityCreate}
          show={BaseEntityShow}
        />
        <Resource
          name="ContentItem"
          list={ContentItemList}
          edit={ContentItemEdit}
          create={ContentItemCreate}
          show={ContentItemShow}
        />
        <Resource
          name="Place"
          list={PlaceList}
          edit={PlaceEdit}
          create={PlaceCreate}
          show={PlaceShow}
        />
        <Resource
          name="NewsItem"
          list={NewsItemList}
          edit={NewsItemEdit}
          create={NewsItemCreate}
          show={NewsItemShow}
        />
        <Resource
          name="Comment"
          list={CommentList}
          edit={CommentEdit}
          create={CommentCreate}
          show={CommentShow}
        />
        <Resource
          name="Reaction"
          list={ReactionList}
          edit={ReactionEdit}
          create={ReactionCreate}
          show={ReactionShow}
        />
        <Resource
          name="UserReaction"
          list={UserReactionList}
          edit={UserReactionEdit}
          create={UserReactionCreate}
          show={UserReactionShow}
        />
        <Resource
          name="Product"
          list={ProductList}
          edit={ProductEdit}
          create={ProductCreate}
          show={ProductShow}
        />
      </Admin>
    </div>
  );
};

export default App;
