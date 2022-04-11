import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UsersShow from '../components/users/Show';
import ChartsIndex from '../components/charts/Index';
import Entry from '../components/entry/Index';
import RideShare from '../components/rideshare/Index';
import Archives from '../components/staticPages/Archives';
import ByLaws from '../components/staticPages/ByLaws';
import CharitableGiving from '../components/staticPages/CharitableGifts';
import CommitteePrimer from '../components/staticPages/CommitteePrimer';
import Customs from '../components/staticPages/Customs';
import FamilyAgreements from '../components/staticPages/FamilyAgreements';
import History from '../components/staticPages/History';
import Membership from '../components/staticPages/Membership';
import PlannedGiving from '../components/staticPages/PlannedGiving';
import Forms from '../components/staticPages/Forms';
  
export default function Index(props) {
    let userId = props.userId;
    let isAdmin = props.isAdmin;
    let isAuthenticated = props.isAuthenticated;
    return (
        <Switch>
            <Route exact path='/' render={(props) => <Entry {...props} userId={userId} isAuthenticated={isAuthenticated} />} />
            {
                props.isAuthenticated &&
                <React.Fragment>
                    <Route exact path='/rideshare' render={(props) => <RideShare {...props} userId={userId} isAdmin={isAdmin} />} />
                    <Route exact path='/users/:id' render={(props) => <UsersShow {...props} userId={userId} />} />
                    <Route exact path='/charts' render={(props) => <ChartsIndex {...props} userId={userId} />} />
                    <Route exact path='/archives' render={(props) => <Archives {...props} userId={userId} />} />
                    <Route exact path='/by-laws' render={(props) => <ByLaws {...props} userId={userId} />} />
                    <Route exact path='/membership' render={(props) => <Membership {...props} userId={userId} />} />
                    <Route exact path='/customs' render={(props) => <Customs {...props} userId={userId} />} />
                    <Route exact path='/charitable-gifts' render={(props) => <CharitableGiving {...props} userId={userId} />} />
                    <Route exact path='/planned-giving' render={(props) => <PlannedGiving {...props} userId={userId} />} />
                    <Route exact path='/committee-primer' render={(props) => <CommitteePrimer {...props} userId={userId} />} />
                    <Route exact path='/family-agreements' render={(props) => <FamilyAgreements {...props} userId={userId} />} />
                    <Route exact path='/history' render={(props) => <History {...props} userId={userId} />} />
                    <Route exact path='/forms' render={(props) => <Forms {...props} userId={userId} />} />
                </React.Fragment>
            }   
        </Switch>
    )
}