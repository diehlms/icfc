import React from "react";
import { Route, Switch } from "react-router-dom";

import Articles from "../components/Articles/All/index";
import Cabins from "../components/Cabins/All/index";
import Events from "../components/Events/All/index";
import Pictures from "../components/Pictures/All/index";
import Search from "../components/Search/index";
import Users from "../components/Users/All/index";
import Home from "../components/StaticPages/Home/index";

import ArticleShow from "../components/Articles/Show/index";
import CabinShow from "../components/Cabins/Show/index";
import EventShow from  "../components/Events/Show/index";
import PictureShow from "../components/Pictures/Show/index";
import UserShow from "../components/Users/Show/index";

import ArticleEdit from "../components/Articles/Edit/index";
import CabinEdit from "../components/Cabins/Edit/index";
import EventEdit from "../components/Events/Edit/index"
import UserEdit from "../components/Users/Edit/index";

import CabinCreate from "../components/Cabins/Create/index";
import EventCreate from "../components/Events/Create/index"
import PictureCreate from "../components/Pictures/Create/index"

export default (
  <Switch>
    <Route path="/articles" exact component={Articles} />
    <Route path="/cabins" exact component={Cabins} />
    <Route path="/events" exact component={Events} />
    <Route path="/pictures" exact component={Pictures} />
    <Route path="/search" exact component={Search} />
    <Route path="/users" exact component={Users} />
    <Route path="/home" exact component={Home} />

    <Route path="/articles/:id" exact component={ArticleShow} />
    <Route path="/cabins/:id" component={CabinShow} />
    <Route path="/events/:id" component={EventShow} />
    <Route path="/pictures/:id" component={PictureShow} />
    <Route path="/users/:id" component={UserShow} />

    <Route path="/articles/:id/edit" component={ArticleEdit} />
    <Route path="/cabins/:id/edit" component={CabinEdit} />
    <Route path="/events/:id/edit" component={EventEdit} />
    <Route path="/users/:id/edit" component={UserEdit} />

    <Route path="/cabins/create" component={CabinCreate} />
    <Route path="/events/create" component={EventCreate} />
    <Route path="/pictures/create" component={PictureCreate} />
  </Switch>
);