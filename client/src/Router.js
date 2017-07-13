import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import Landing from './components/Landing'
import SiteNavbar from './components/navbar'
import Unauthorized from './components/Errors/Unauthorized'
import LoggedOutOnly from './components/Errors/LoggedOutOnly'
import NotFound from './components/Errors/NotFound'
import setHeader from './components/shared/setHeader'
import {Grid} from 'react-bootstrap'  
class Router extends Component{
    constructor(){
        super()
        this.state = {isLoggedIn: false}
        this.checkForToken = this.checkForToken.bind(this)
        this.setToken = this.setToken.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }
    componentDidMount(){
        this.checkForToken()
    }
    setToken(token) {
        localStorage.setItem('Authorization', token)
        this.checkForToken();
    }
    logout(){
        localStorage.removeItem('Authorization');
        this.checkForToken();
    }
    login(body){
        let success = null;
        let getLogin = fetch('/api/login', setHeader('POST', '', body))
            .then(response => response.json())
            .then(response => this.setToken(response.token))
            .then(response => success = true)
            .then(response => this.checkForToken())
            .catch((error) => {success = false})
        return getLogin
            .then(() => {
                return success;
            })
            .catch(() => {
                return success;
            })
    }
    protect(component){
        if (this.state.isLoggedIn){
            return () => {
                return component
            }
        }else{
            return () => {
                let result = <Unauthorized/> 
                return result
            }
        }
    }
    loggedOutOnly(component){
        if (!this.state.isLoggedIn){
            return () => {
                return component
            }
        }else{
            return () => {
                let result = <LoggedOutOnly logout={this.logout}/>
                return result
            }
        }
    }
    checkForToken(){
        if (localStorage.getItem('Authorization')){
            this.setState({isLoggedIn: true})
        }else{
            this.setState({isLoggedIn: false})
        }
    }
    render(){
        return(
        <Grid>
            <SiteNavbar logout={this.logout} isLoggedIn={this.state.isLoggedIn} />
            <Switch> 
                <Route exact path="/" component={Landing}/>
                <Route path="/signup" component={this.loggedOutOnly(<SignUp />, "/signup")} />
                <Route path="/login" component={this.loggedOutOnly(<Login login = {this.login} />, "/login")} />
                <Route path="/profile" component={this.protect(<Profile />)} />
                <Route component={NotFound} />
            </Switch>
        </Grid>
        )
    }

}

export default Router