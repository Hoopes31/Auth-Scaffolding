import React from "react";
import { Col, Row, Form, FormControl, Button } from "react-bootstrap";
import { withRouter } from "react-router";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errorMessage: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // handles the returned promise from the router's login function,
    // routes to profile on success, sets the error message on failure.
    this.props.login(JSON.stringify(this.state)).then(success => {
      if (success) {
        this.props.history.push("/profile");
      } else {
        this.setState({ errorMessage: "Login Invalid" });
      }
    });
  }

  render() {
    return (
      <Row className="Login">
        <Col xs={10} xsOffset={1}>
          <Form onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            <hr />
            <Col xs={10} xsOffset={1}>
              <FormControl
                id="username"
                type="text"
                placeholder="Username"
                required
                onChange={this.handleChange}
              />
              <br />
              <FormControl
                id="password"
                type="password"
                placeholder="Password"
                required
                onChange={this.handleChange}
              />
              <div id="errorMessage">
                {this.state.errorMessage}
              </div>
              <br />
              <Button type="submit">Login</Button>
            </Col>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Login);
