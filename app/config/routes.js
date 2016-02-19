/**
 * Created by NiekKruse on 2/18/16.
 */
import React from 'react';
import Home from '../components/Home';
import Main from'../components/Main';
import Profile from '../components/Profile';
import { Route, IndexRoute }  from 'react-router'

export default (
    <Route path="/" component={Main}>
        <Route path="/profile/:username" component={Profile}/>
        <IndexRoute component={Home}/>
    </Route>
);