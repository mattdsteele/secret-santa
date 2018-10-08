import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllLists } from '../store/actions';

const mapStateToProps = ({ users, lists }) => {
  return {
    users: users.usersList,
    lists: lists.all
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
  state = {
    year: 2018
  };
  newYear = e => {
    this.setState({ year: parseInt(e.target.value) });
  };
  nameOfUser(uid) {
    return this.props.users.filter(user => user.uid === uid)[0].displayName;
  }
  render() {
    return (
      <>
        <label htmlFor="year">Year:</label> {this.state.year}
        {/* <input type="number" value={this.state.year} onChange={this.newYear} /> */}
        <p>Has submitted a list:</p>
        <ul>
          {this.props.lists &&
            this.props.lists
              .filter(list => list.year === this.state.year)
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
