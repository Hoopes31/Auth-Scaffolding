import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Row, Navbar,Nav,NavItem} from 'react-bootstrap'

export default class SiteNavbar extends Component{
  constructor(){
    super();
    this.state = {isLoggedin: false};
  }
    render(){
        return(<Row>
        <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Boilerplate</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        {/*<NavItem eventKey={1} href="#">my element 1</NavItem>
        <NavItem eventKey={2} href="#">my element 2</NavItem>*/}
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">Login</NavItem>
        <NavItem eventKey={2} href="#">Signup</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  </Row>)
    }
}