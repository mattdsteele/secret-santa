import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../store/actions';

const mapStateToProps = state => {
  return {
    users: state.users.usersList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onConnect: () => dispatch(getUsers())
  };
};

class allUsers extends Component {
  componentDidMount() {
    this.props.onConnect();
  }
  render() {
    return (
      <div className="hidden">
        <h2>Users</h2>
        {this.props.users &&
          this.props.users.map(user => (
            <p key={user.uid}>
              {user.displayName} - {user.email}
            </p>
          ))}
      </div>
    );
  }
}

const AllUsers = connect(mapStateToProps, mapDispatchToProps)(allUsers);

export { AllUsers };
