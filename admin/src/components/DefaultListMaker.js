import React, { Component } from 'react';
import { connect } from 'react-redux';
import { functions } from '../store/firebase';
import { getUsers } from '../store/actions';
const defaultLists = functions.httpsCallable('makeDefaultLists');

const mapStateToProps = (state) => {
  return {
    users: state.users.activeUsers,
    year: state.lists.year,
    lists: state.lists.all,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onConnect: () => dispatch(getUsers()),
  };
};

class defaultListMaker extends Component {
  componentDidMount() {
    this.props.onConnect();
  }
  async makeDefaultLists() {
    const year = new Date().getFullYear();
    const res = await defaultLists({ year });
    console.log(res.data);
  }
  render() {
    if (!this.props.lists) {
      return <h2>Default lists for {this.props.year}</h2>;
    }
    const currentYearLists = this.props.lists.filter(
      (l) => l.year === this.props.year
    );
    return (
      <div>
        <h2>Default lists for {this.props.year}</h2>
        {currentYearLists.length === 0 ? (
          <button onClick={() => this.makeDefaultLists()}>
            Make default lists
          </button>
        ) : (
          <p>
            {' '}
            {currentYearLists.length} lists already generated for{' '}
            {this.props.year}
          </p>
        )}
      </div>
    );
  }
}

const DefaultListMaker = connect(
  mapStateToProps,
  mapDispatchToProps
)(defaultListMaker);

export { DefaultListMaker };
