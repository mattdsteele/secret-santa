import React, { Component } from 'react';
import { connect } from 'react-redux';
import { User } from './User';
import { saveYearPairings } from '../store/actions';
const mapStateToProps = (store) => {
  return {
    users: store.users.activeUsers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    async saveYear(year, pairings) {
      console.log('saving list', pairings);
      await dispatch(saveYearPairings(year, pairings));
    },
  };
};
class pairings extends Component {
  state = {
    year: 2014,
    gifter: null,
    giftee: null,
    pairings: [],
  };
  addPairing() {
    const newPairings = [
      ...this.state.pairings,
      [this.userFor(this.state.gifter), this.userFor(this.state.giftee)],
    ];
    this.setState({ pairings: newPairings });
  }
  userFor(id) {
    return this.props.users.filter((u) => u.uid === id)[0];
  }
  async saveYear() {
    await this.props.saveYear(this.state.year, this.state.pairings);
    this.setState({ gifter: null, giftee: null, pairings: [] });
  }
  render() {
    return (
      <div className="hidden">
        <h1>Year: {this.state.year}</h1>
        {this.props.users && (
          <>
            <User
              val={this.state.gifter}
              users={this.props.users}
              onSelectChanged={(e) => this.setState({ gifter: e })}
            />
            <User
              val={this.state.giftee}
              users={this.props.users}
              onSelectChanged={(e) => this.setState({ giftee: e })}
            />
          </>
        )}
        <button onClick={() => this.addPairing()}>Add</button>
        <ul>
          {this.state.pairings.map(([gifter, giftee]) => (
            <li>
              {gifter.displayName} - {giftee.displayName}
            </li>
          ))}
        </ul>
        <button onClick={() => this.saveYear()}>Save {this.state.year}</button>
      </div>
    );
  }
}

export const Pairings = connect(mapStateToProps, mapDispatchToProps)(pairings);
