import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import Profile from './Profile/Profile'
import Landing from './Landing/Landing'
import SiteNavbar from './SiteNavbar/SiteNavbar'
import AdminDashboard from './AdminDashboard/AdminDashboard'
import TraderPage from './Trade/TradeContainer'
import Unauthorized from './Errors/Unauthorized'
import LoggedOutOnly from './Errors/LoggedOutOnly'
import NotFound from './Errors/NotFound'
import setHeader from './shared/setHeader'
import {Grid} from 'react-bootstrap'  
class Router extends Component{
    constructor(){
        super()
        this.state = {isLoggedIn: false, isAdmin: false}
        this.checkForCredentials = this.checkForCredentials.bind(this)
        this.setCredentials = this.setCredentials.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }
    componentDidMount(){
        this.checkForCredentials()
    }
    //setCredentials to the state of the application
    //then set token to the browser
    //This needs to be checked for proper use. I believe the arguments passed to setItem are
    //named imporperly for JWT auth.
    setCredentials(token, role) {
        localStorage.setItem('Authorization', token)
        if (role === 'admin'){
            localStorage.setItem('role', role)
        }
        this.checkForCredentials()
    }
    //pass logout to any Component that requires a logout button and call it as a prop.
    logout(){
        localStorage.removeItem('Authorization')
        localStorage.removeItem('role')
        this.checkForCredentials()
    }
    login(body){
        let success = null
        let getLogin = fetch('/api/login', setHeader('POST', '', body))
            .then(response => response.json())
            .then(response => this.setCredentials(response.token, response.role))
            .then(response => success = true)
            .then(response => this.checkForCredentials())
            .catch((error) => {success = false})
        //This is a bit of a leaky abstraction, if after you call login, it returns a promise.
        //.then will return a boolean indicating if the response succeeded or not. 
        return getLogin
            .then(() => {
                return success
            })
    }
    //Any page you do not want the user to view without a token, wrap with protect
    //ex. <Route path="/foo" component={this.protect(<Foo/>)} />
    protect(component){
        if (this.state.isLoggedIn){
            return () => {
                return component
            }
        }else{
            return () => {
                //We have to store the JSX in a variable before we return it, because returning raw JSX to 
                //the Route's component prop is unsupported. This way we make sure it gets parsed first.
                let result = <Unauthorized/> 
                return result
            }
        }
    }
    adminOnly(component){
        if (this.state.isLoggedIn && this.state.isAdmin){
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
    //Any page you do not want the user to view WITH a token, wrap with loggedOutOnly
    //ex. <Route path="/bar" component={this.loggedOutOnly(<Bar/>)} />
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
    // This function needs to be called any time a token is removed from localStorage, it updates the router state to match. 
    // shouldn't need to be called/passed unless you are manipulating the token.  
    checkForCredentials(){
        if (localStorage.getItem('Authorization')){
            this.setState({isLoggedIn: true})
        }else{
            this.setState({isLoggedIn: false})
        }
        if (localStorage.getItem('role') === "admin"){
            this.setState({isAdmin: true})
        }else{
            this.setState({isAdmin: false})
        }
    }
    render(){
        return(
        <Grid>
            <SiteNavbar logout={this.logout} isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin}/>
            <Switch> 
                <Route exact path="/" component={Landing}/>
                <Route path="/signup" component={this.loggedOutOnly(<SignUp checkForCredentials={this.checkForCredentials}/>)} />
                <Route path="/login" component={this.loggedOutOnly(<Login login = {this.login} />)} />
                <Route path="/profile" component={this.protect(<Profile />)} />
                <Route path="/trader" component={TraderPage}/>
                <Route path="/admindashboard" component={this.adminOnly(<AdminDashboard />)} />
                <Route component={NotFound} />
            </Switch>
        </Grid>
        )
    }

}

export default Router