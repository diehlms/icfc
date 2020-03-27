import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ArticlesIndex from '../components/articles/Index';
import CabinsIndex from '../components/cabins/Index';
import EventsIndex from '../components/events/Index';
import PicturesIndex from '../components/pictures/Index';
import UsersIndex from '../components/users/Index';
import ArticlesShow from '../components/articles/Show';
import CabinsShow from '../components/cabins/Show';
import EventsShow from '../components/events/Show';
import PicturesShow from '../components/pictures/Show';
import UsersShow from '../components/users/Show';
import Archives from '../components/pages/Archives';
import ByLaws from '../components/pages/ByLaws';
import CharitableGiftFund from '../components/pages/CharitableGiftFund' 
import CustomsTraditions from '../components/pages/CustomsTraditions' 
import FamilyAgreements from '../components/pages/FamilyAgreementsPolicy' 
import Forms from '../components/pages/Forms' 
import History from '../components/pages/History' 
import PlannedGiving from '../components/pages/PlannedGiving' 
import Membership from '../components/pages/Membership'
import Home from '../components/pages/Home'
import Search from '../components/search/index'
  
export default function Index(props) {
    let user_id = props.user_id;
    return (
          <Switch>
            <Route exact path='/articles' render={(props) => <ArticlesIndex {...props} user_id={user_id} />} />
            <Route exact path='/cabins' render={(props) => <CabinsIndex {...props} user_id={user_id} />} />
            <Route exact path='/events' render={(props) => <EventsIndex {...props} user_id={user_id} />} />
            <Route exact path='/pictures' render={(props) => <PicturesIndex {...props} user_id={user_id} />} />
            <Route exact path='/users' render={(props) => <UsersIndex {...props} user_id={user_id} />} />

            <Route exact path='/articles/:id' render={(props) => <ArticlesShow {...props} user_id={user_id} />} />
            <Route exact path='/cabins/:id' render={(props) => <CabinsShow {...props} user_id={user_id} />} />
            <Route exact path='/events/:id' render={(props) => <EventsShow {...props} user_id={user_id} />} />
            <Route exact path='/pictures/:id' render={(props) => <PicturesShow {...props} user_id={user_id} />} />
            <Route exact path='/users/:id' render={(props) => <UsersShow {...props} user_id={user_id} />} />

            <Route exact path='/archives' render={(props) => <Archives {...props} user_id={user_id} />} />
            <Route exact path='/bylaws' render={(props) => <ByLaws {...props} user_id={user_id} />} />
            <Route exact path='/membership' render={(props) => <Membership {...props} user_id={user_id} />} />
            <Route exact path='/charitablegiftfund' render={(props) => <CharitableGiftFund {...props} user_id={user_id} />} />
            <Route exact path='/customstraditions' render={(props) => <CustomsTraditions {...props} user_id={user_id} />} />
            <Route exact path='/familyagreements' render={(props) => <FamilyAgreements {...props} user_id={user_id} />} />
            <Route exact path='/forms' render={(props) => <Forms {...props} user_id={user_id} />}/>
            <Route exact path='/history' render={(props) => <History {...props} user_id={user_id} />} />
            <Route exact path='/plannedgiving' render={(props) => <PlannedGiving {...props} user_id={user_id} />} />

            <Route exact path='/home' render={(props) => <Home {...props} user_id={user_id} />} />
            
            <Route exact path='/search' render={(props) => <Search {...props} user_id={user_id} />} />
        </Switch>
    )
}
