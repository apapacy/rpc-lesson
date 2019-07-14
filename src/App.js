import React from 'react';
import { Admin, Resource, EditGuesser } from 'react-admin';
import UserList from './UserList';
import dataProvider from './wsProvider';

const App = () => <Admin dataProvider={dataProvider}>
  <Resource name="users" list={UserList} edit={EditGuesser} />
</Admin>;

export default App;
