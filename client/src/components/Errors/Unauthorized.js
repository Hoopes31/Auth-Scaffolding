import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import {Col, Row} from 'react-bootstrap'
class Unauthorized extends Component{
    render(){
    return(
    <Row>
        <Col xs={10} xsOffset={1}>
            <h2>You are not authorized to view this page, please  <Link to="/login">Login</Link></h2>
        </Col>
    </Row>
    )
    }
}
export default Unauthorized;