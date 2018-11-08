import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveRelationships, getAllRelationships } from '../store/actions';

const mapStateToProps = store => {
  return {
    users: store.users.usersList,
    relationships: store.relationships.relationships
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveList(relationships) {
      console.log('saving list', relationships);
      dispatch(saveRelationships(relationships));
    },
    getRelationships() {
      dispatch(getAllRelationships());
    }
  };
};
class relationships extends Component {
  componentDidMount() {
    this.props.getRelationships();
  }
  state = { relationships: [] };
  save() {
    this.props.saveList(this.state.relationships);
  }
  onPerson1Change(e) {
    this.setState({ person1Id: e.target.value });
  }
  onPerson2Change(e) {
    this.setState({ person2Id: e.target.value });
  }
  userFor(id) {
    return this.props.users.filter(u => u.uid === id)[0];
  }
  addEntry() {
    const newRels = [
      ...this.state.relationships,
      [this.userFor(this.state.person1Id), this.userFor(this.state.person2Id)]
    ];
    console.log(newRels);
    this.setState({ relationships: newRels });
  }
  makeRelationshipSetting() {
    console.log(this.props.relationships);
    return this.props.relationships.map(({ person1, person2 }) => {
      return (
        <li>
          {this.userFor(person1).displayName} -{' '}
          {this.userFor(person2).displayName}
        </li>
      );
    });
  }
  render() {
    return (
      <>
        {this.props.users && (
          <>
            <select
              value={this.state.person1Id}
              onChange={e => this.onPerson1Change(e)}
            >
              {this.props.users.map(u => (
                <option value={u.uid}>{u.displayName}</option>
              ))}
            </select>
            <select
              value={this.state.person2Id}
              onChange={e => this.onPerson2Change(e)}
            >
              {this.props.users.map(u => (
                <option value={u.uid}>{u.displayName}</option>
              ))}
            </select>
            <button onClick={e => this.addEntry()}>Add Relationship</button>
          </>
        )}
        <h1>Relationships</h1>
        <ul>
          {this.state.relationships.map(([person1, person2]) => (
            <li>
              {person1.displayName} - {person2.displayName}
            </li>
          ))}
        </ul>
        <button onClick={() => this.save()}>Save</button>
        {this.props.relationships &&
          this.props.users && <ul>{this.makeRelationshipSetting()}</ul>}
      </>
    );
  }
}

const Relationships = connect(
  mapStateToProps,
  mapDispatchToProps
)(relationships);

export { Relationships };
