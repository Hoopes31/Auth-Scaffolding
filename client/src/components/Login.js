import React from 'react'
import {Col,Row, Form, FormControl, Button} from 'react-bootstrap'
import { withRouter } from 'react-router'
//Input fields: DONE
//Validation: DONE
//Hash Salt Capability: DONE BACKEND AUTH
//Local Storage of Token Save: DONE
//Redirect to Profile: DONE

class Login extends React.Component {
    
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    //setToken to the state of the application
    //then set token to the browser
    //This needs to be checked for proper use. I believe the arguments passed to setItem are
    //named imporperly for JWT auth.

    handleSubmit(event) {
        event.preventDefault();
        this.props.login(JSON.stringify(this.state))
            .then((success) => {
                if(success){
                    this.props.history.push('/profile')
                }else{
                    this.setState({errorMessage: 'Login Invalid'})
                }
            })
    }

    render(){
        return(
        <Row className="Login">
            <Col xs={10} xsOffset={1}>
                <Form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <hr />
                    <Col xs={10} xsOffset={1}>
                        <FormControl 
                            id='username' 
                            type='text' 
                            placeholder='Username'
                            required 
                            onChange={this.handleChange}/>
                        <br />
                        <FormControl 
                            id='password' 
                            type='password' 
                            placeholder='Password'
                            required 
                            onChange={this.handleChange}/>
                            <div id='errorMessage'>{this.state.errorMessage}</div>
                        <br />
                        <Button type='submit'>Login</Button>
                    </Col>
                </Form>
            </Col>
        </Row>
    )
    }
}

export default withRouter(Login)