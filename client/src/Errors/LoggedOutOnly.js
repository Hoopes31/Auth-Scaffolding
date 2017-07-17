import React, {Component} from 'react'
import {Col, Row} from 'react-bootstrap'
class LoggedOutOnly extends Component{
    handleLogout(){
        this.props.logout()
    }
    render(){
    return(
        <Row>
            <Col xs={10} xsOffset={1}>
                <h2>You need to <a onClick={this.handleLogout.bind(this)}>Logout</a> before viewing this page.</h2>
            </Col>
        </Row>
    )
    }
}
export default LoggedOutOnly