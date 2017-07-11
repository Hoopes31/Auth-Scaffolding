import React from 'react'
import { Link } from 'react-router-dom'
import {Col, Row} from 'react-bootstrap'
const Unauthorized = () => {
    return(<Row>
        <Col xs={10} xsOffset={1}>
            <h2>You are not authorized to view this page, please  <Link to="/Login">Login</Link></h2>
        </Col>
    </Row>)
}
export default Unauthorized;