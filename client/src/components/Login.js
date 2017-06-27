import React from 'react'

//Input fields \u2713
//Validation \u2713
//Submit button \u2713
//Wire Submit button \u2713
//Hash Salt Capability
//Local Storage of Token Save
//Redirect to Profile

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

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        //if the form is correct send api!
        if (false) {
            fetch('/api/login') , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
                }
        } //else send errors
        else {
            console.log(`Form Error!`)
        }
    }

}

export default Login