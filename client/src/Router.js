import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile'

const Router = () => (
    <Switch>
        <Route exact path="/" component={SignUp} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
    </Switch>
)

export default Router