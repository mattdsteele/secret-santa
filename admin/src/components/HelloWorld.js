import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    foo: state.foo
  };
};

const helloWorld = props => {
  return <p>Hello world, {props.foo.foo}</p>;
};

const HelloWorld = connect(mapStateToProps)(helloWorld);

export { HelloWorld };
