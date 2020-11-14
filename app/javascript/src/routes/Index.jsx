import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UsersShow from '../components/users/Show';
import ChartsIndex from '../components/charts/Index';
  
export default function Index(props) {
    let user_id = props.user_id;
    return (
        <Switch>
            <Route exact path='/users/:id' render={(props) => <UsersShow {...props} user_id={user_id} />} />
            <Route path='/charts' render={(props) => <ChartsIndex {...props} user_id={user_id} />} />
        </Switch>
    )
}
