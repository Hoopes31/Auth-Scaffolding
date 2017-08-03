import React, { Component } from "react";
import {
  Col,
  Row,
  Table,
  Modal,
  Button,
  Radio,
  FormGroup
} from "react-bootstrap";
import setHeader from "../shared/setHeader";
class AdminDashboard extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      showModal: false,
      activeModalUser: {},
      roles: ["moderator", "user"]
    };
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  getUsers() {
    const query = `/api/admin/findAllUsers/?username=user&paginationDate=${new Date().toISOString()}`;
    fetch(query, setHeader("GET", localStorage.getItem("Authorization"), {}))
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({ users: response });
      });
  }
  toggleEditModal(user) {
    this.setState({ showModal: !this.state.showModal, activeModalUser: user });
  }
  componentDidMount() {
    this.getUsers();
  }
  deleteUser(user) {
    let query = `/api/admin/findUser?username=${user.username}`;
    fetch(query, setHeader("DELETE", localStorage.getItem("Authorization"), {}))
      .then(response => {
        this.getUsers();
        return response;
      })
      .catch(err => {
        console.error(err);
      });
  }
  editUser(user, role) {
    let query = `/api/admin/findUser?username=${user.username}&roleUpdate=${role}`;
    fetch(query, setHeader("PUT", localStorage.getItem("Authorization"), {}))
      .then(response => {
        this.getUsers();
        return response;
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    return (
      <Row>
        <Col xs={10} xsOffset={1}>
          <UserTable
            users={this.state.users}
            toggleEditModal={this.toggleEditModal}
            deleteUser={this.deleteUser}
          />
        </Col>
        <EditModal
          showModal={this.state.showModal}
          activeModalUser={this.state.activeModalUser}
          toggleEditModal={this.toggleEditModal}
          editUser={this.editUser}
          roles={this.state.roles}
        />
      </Row>
    );
  }
}
class UserTable extends Component {
  render() {
    return (
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
            return (
              <UserTableRow
                user={user}
                key={user.username}
                rowIndex={index}
                toggleEditModal={this.props.toggleEditModal}
                deleteUser={this.props.deleteUser}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}
class UserTableRow extends Component {
  constructor() {
    super();
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.ifNotAdmin = this.ifNotAdmin.bind(this);
  }
  ifNotAdmin(component) {
    if (this.props.user.role !== "admin") {
      return component;
    } else {
      return <td />;
    }
  }
  handleEdit(event) {
    this.props.toggleEditModal(this.props.user);
  }
  handleDelete() {
    if (
      window.confirm(
        `Are you sure you want to delete user: '${this.props.user.username}'`
      )
    ) {
      this.props.deleteUser(this.props.user);
    }
  }
  render() {
    return (
      <tr>
        <td className="text-center">
          {this.props.rowIndex + 1}
        </td>
        <td className="text-center">
          {this.props.user.username}
        </td>
        <td className="text-center">
          {this.props.user.firstName}
        </td>
        <td className="text-center">
          {this.props.user.lastName}
        </td>
        {this.ifNotAdmin(
          <td className="text-center dash-button" onClick={this.handleDelete}>
            <span role="img" aria-label="cross mark">
              ❌
            </span>
          </td>
        )}
        {this.ifNotAdmin(
          <td className="text-center dash-button" onClick={this.handleEdit}>
            <span>{this.props.user.role}</span>{" "}
            <span className="pull-right" role="img" aria-label="pencil">
              ✏️
            </span>
          </td>
        )}
      </tr>
    );
  }
}
class EditModal extends Component {
  constructor() {
    super();
    this.state = { role: "" };
    this.handleConfirm = this.handleConfirm.bind(this);
    this.changeRole = this.changeRole.bind(this);
  }
  handleConfirm() {
    this.props.editUser(this.props.activeModalUser, this.state.role);
    this.props.toggleEditModal();
  }
  changeRole(event) {
    this.setState({ role: event.target.id });
  }
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.toggleEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            {this.props.roles.map((role, i) => {
              return (
                <Radio
                  key={role}
                  id={role}
                  name="radioGroup"
                  inline
                  onClick={this.changeRole}
                >
                  {" "}{role}{" "}
                </Radio>
              );
            })}
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.handleConfirm}>
            Confirm
          </Button>
          <Button onClick={this.props.toggleEditModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AdminDashboard;
