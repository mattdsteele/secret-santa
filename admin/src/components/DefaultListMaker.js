import React, { Component } from 'react';
import { connect } from 'react-redux';
import { functions } from '../store/firebase';
import { getUsers } from '../store/actions';
const defaultLists = functions.httpsCallable('makeDefaultLists');

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

class defaultListMaker extends Component {
  componentDidMount() {
    this.props.onConnect();
  }
  async makeDefaultLists() {
    const year = new Date().getFullYear();
    const res = await defaultLists({ year });
    console.log(res);
    console.log(res.data);
  }
  render() {
    return (
      <div>
        <h2>Default lists</h2>
        <button onClick={() => this.makeDefaultLists()}>
          Make default lists
        </button>
      </div>
    );
  }
}

const DefaultListMaker = connect(
  mapStateToProps,
  mapDispatchToProps
)(defaultListMaker);

export { DefaultListMaker };
