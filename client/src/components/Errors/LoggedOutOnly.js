import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {Col, Row} from 'react-bootstrap'
class LoggedOutOnly extends Component{

    render(){
    return(
        <Row>
            <Col xs={10} xsOffset={1}>
                <h2>You need to <Link to={this.props.route.path}>Logout</Link> before viewing this page.</h2>
            </Col>
        </Row>
    )
    }
}
export default LoggedOutOnly;