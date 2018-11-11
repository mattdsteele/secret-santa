import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllLists } from '../store/actions';

const mapStateToProps = ({ users, lists }) => {
  return {
    users: users.usersList,
    lists: lists.all,
    year: lists.year
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onConnect: () => dispatch(getAllLists())
  };
};

class userStatus extends Component {
  componentDidMount() {
    this.props.onConnect();
  }
  newYear = e => {
    this.setState({ year: parseInt(e.target.value) });
  };
  nameOfUser(uid) {
    return this.props.users.filter(user => user.uid === uid)[0].displayName;
  }
  render() {
    return (
      <>
        <label htmlFor="year">Year:</label> {this.props.year}
        <p>Has submitted a list:</p>
        <ul>
          {this.props.lists &&
            this.props.lists
              .filter(list => list.year === this.props.year)
              .map(list => {
                return <li key={list.user}>{this.nameOfUser(list.user)}</li>;
              })}
        </ul>
      </>
    );
  }
}

const UserStatus = connect(
  mapStateToProps,
  mapDispatchToProps
)(userStatus);

export { UserStatus };
