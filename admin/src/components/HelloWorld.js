import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../store/actions';

const mapStateToProps = state => {
  return {
    foo: state.foo.foo
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onConnect: () => dispatch(getUsers())
  };
};

class helloWorld extends Component {
  componentDidMount() {
    this.props.onConnect();
  }
  render() {
    return <p>Hello world, {this.props.foo}</p>;
  }
}

const HelloWorld = connect(
  mapStateToProps,
  mapDispatchToProps
)(helloWorld);

export { HelloWorld };
