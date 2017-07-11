import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import Landing from './components/Landing'
import SiteNavbar from './components/navbar'
import {Grid} from 'react-bootstrap';   
const Router = () => (
    <Grid>
        <SiteNavbar />
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/signup" component={SignUp}/>
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
    </Switch>
    </Grid>
)

export default Router