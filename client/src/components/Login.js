import React from 'react'

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
            password: ''
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
    //This needs to be checked for proper use. I blieve the arguments passed to setItem are
    //named imporperly for JWT auth.
    setToken(result) {
        sessionStorage.setItem('Authorization', result.token)
    }

    handleSubmit(event) {
        event.preventDefault()
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            .then(response => response.json())
            .then(result => this.setToken(result))

            //.then(this.props.history.push('/gardin'))
    }

    render(){
        return(
            <div className='Login'>
                <form onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                    <input 
                        id='username' 
                        type='text' 
                        placeholder='Username'
                        required 
                        onChange={this.handleChange}/>
                        <input 
                        id='password' 
                        type='password' 
                        placeholder='Password'
                        required 
                        onChange={this.handleChange}/>
                        <div id='errorMessage'>{this.state.errorMessage}</div>
                        <button
                        type='submit'>
                        Login</button>
                    </form>
            </div>
        )
    }
}

export default Login