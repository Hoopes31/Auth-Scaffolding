import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {Col, Row} from 'react-bootstrap'
class NotFound extends Component{
    handleLogout(){
        this.props.logout();
    }
    render(){
    return(
        <Row>
            <Col xs={10} xsOffset={1}>
                <h2>Whoops, we don't have the page you've requested. <Link to="/">Go Home</Link></h2>
            </Col>
        </Row>
    )
    }
}
export default NotFound;