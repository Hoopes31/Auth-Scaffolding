import React, {Component} from 'react'
import {Col,Row, Table} from 'react-bootstrap'
import setHeader from '../shared/setHeader'
class AdminDashboard extends Component {
    constructor(){
        super()
        this.state = {users: [
            {username: 'bob', firstName: 'bob', lastName: 'bobert', rank: 'user'}
        ]}
    }
    getUsers(){
        let token = localStorage.getItem('token')
        let result = fetch('/api/findAllUsers', setHeader('GET', token , {}))
            .then((response) => {
                console.log(response)
                return response
            })

    }
    componentDidMount(){
        this.getUsers()
    }
    render(){
        return(
        <Row>
            <Col xs={10} xsOffset={1}>
            <UserTable users={this.state.users}/>
            </Col>
        </Row>
        )
    }
}
class UserTable extends Component {
    render(){
        return(  
        <Table striped bordered condensed hover>
            <thead>
            <tr>
                <th className="text-center">#</th>
                <th className="text-center">Username</th>
                <th className="text-center">First Name</th>
                <th className="text-center">Last Name</th>
                <th className="text-center">Delete</th>
                <th className="text-center">Rank</th>
            </tr>
            </thead>
            <tbody>
            {this.props.users.map((user, index) => {
                return(<UserTableRow user={user} key={user.username} rowIndex={index} />)
            })}
            </tbody>
        </Table>
        )
    }
}
class UserTableRow extends Component{
    render(){
        return (
            <tr>
                <td className="text-center">{this.props.rowIndex + 1}</td>
                <td className="text-center">{this.props.user.username}</td>
                <td className="text-center">{this.props.user.firstName}</td>
                <td className="text-center">{this.props.user.lastName}</td>
                <td className="text-center"><span role="img" aria-label="cross mark">❌</span></td>
                <td className="text-center"><span >{this.props.user.rank}</span> <span className="pull-right" role="img" aria-label="pencil">✏️</span></td>
            </tr>
        )
    }
}
export default AdminDashboard 