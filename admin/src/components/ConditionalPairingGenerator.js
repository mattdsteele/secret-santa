import { PairingGenerator } from './PairingGenerator';
import React from 'react';
import { connect } from 'react-redux';
const mapStateToProps = state => {
  return {
    lists: state.lists.all,
    year: state.lists.year
  };
};

const conditionalPairingGenerator = ({ lists, year }) => {
  if (!lists) {
    return <h1>Loading...</h1>;
  }
  const currentYearLists = lists.filter(l => l.year === year);
  if (currentYearLists.length === 0) {
    return <PairingGenerator />;
  }
  return <h6>Pairings already generated for {year}, see below!</h6>;
};
export const ConditionalPairingGenerator = connect(mapStateToProps)(
  conditionalPairingGenerator
);
