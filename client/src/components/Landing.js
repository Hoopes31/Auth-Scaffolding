import React, {Component} from 'react'
import {Col,Row} from 'react-bootstrap'
class Landing extends Component{
    constructor(foo){
        super()
        console.log(foo);
    }
    componentDidMount(){
        console.log(this.props)
    }
    render(){
        return(<Row>
            <Col xs={10} xsOffset={1}>
                <h1>{this.props.checkForToken}</h1>
                <h1>Splash Page, Login or Create an Account</h1>
            </Col>
        </Row>)
    }

}
export default Landing