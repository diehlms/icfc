import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UsersShow from '../components/users/Show';
import EventsIndex from '../components/events/Index';
  
export default function Index(props) {
    let user_id = props.user_id;
    return (
        <Switch>
            <Route exact path='/users/:id' render={(props) => <UsersShow {...props} user_id={user_id} />} />
            <Route path='/events' render={(props) => <EventsIndex {...props} user_id={user_id} />} />
            <Route path='/family_tree' render={(props) => <FamilyTree {...props} user_id={user_id} />} />
        </Switch>
    )
}
