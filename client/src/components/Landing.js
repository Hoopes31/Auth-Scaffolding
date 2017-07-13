import React, {Component} from 'react'
import {Col,Row} from 'react-bootstrap'
class Landing extends Component{
    render(){
        return(
            <Row>
                <Col xs={10} xsOffset={1}>
                    <h1>{this.props.checkForToken}</h1>
                    <h1 className="butt">Splash Page, Login or Create an Account</h1>
                </Col>
            </Row>
        )
    }

}
export default Landing