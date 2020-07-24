import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UsersShow from '../components/users/Show';
  
export default function Index(props) {
    let user_id = props.user_id;
    return (
        <Switch>
            <Route exact path='/users/:id' render={(props) => <UsersShow {...props} user_id={user_id} />} />
        </Switch>
    )
}
