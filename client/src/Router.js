import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import Landing from './components/Landing'
import SiteNavbar from './components/navbar'
import Unauthorized from './components/Errors/Unauthorized'
import LoggedOutOnly from './components/Errors/LoggedOutOnly'
import {Grid} from 'react-bootstrap'  
class Router extends Component{
    constructor(){
        super()
        this.state = {isLoggedIn: false}
        this.checkForToken = this.checkForToken.bind(this)
    }
    protect(component, routePath){
        return <Route path={routePath} component={this.state.isLoggedIn ? component : Unauthorized}/> 
    }
    loggedOutOnly(component, routePath){
        return <Route path={routePath} component={this.state.isLoggedIn ? component : LoggedOutOnly}/> 
    }
    componentDidMount(){
        this.checkForToken()
    }
    checkForToken(){
        if (localStorage.getItem('token')){
            this.setState({isLoggedIn: true})
        }else{
            this.setState({isLoggedIn: false})
        }
    }
    render(){
        return(
        <Grid>
            <SiteNavbar />
            <Switch> 
                <Route exact path="/" component={Landing} checkForToken='foo' isLoggedIn={this.state.isLoggedIn}/>
                {/*<Route path="/signup" component={SignUp} checkForToken={this.checkForToken}/>*/}
                {this.loggedOutOnly(SignUp,"/signup")}
                {this.protect(Profile,"/profile")}
                <Route path="/login" component={Login} checkForToken={this.checkForToken}/>
            </Switch>
        </Grid>
        )
    }

}

export default Router