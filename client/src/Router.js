import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Profile from './components/Profile'
import Login from './components/Login'
import SignUp from './components/SignUp'

const Router = () => (
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/signUp" component={SignUp} />
    </Switch>
)

export default Router