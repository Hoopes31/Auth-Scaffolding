import React from 'react'
import setHeader from './shared/setHeader'
import {Col,Row, Form, FormControl, Button} from 'react-bootstrap'

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

    setToken(token) {
        localStorage.setItem('Authorization', token)
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
        event.preventDefault()

            const body = JSON.stringify(this.state)

            fetch('/api/login', setHeader('POST', '', body))
            .then(response => response.json())
            .then(response => this.setToken(response.token))
            .then(response => this.props.history.push('/profile'))
            .catch(error => this.setState({errorMessage: 'Login Invalid'}))
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
                        <Button bsStyle="primary" type='submit'>Login</Button>
                    </Col>
                </Form>
            </Col>
        </Row>
    )
    }
}

export default Login