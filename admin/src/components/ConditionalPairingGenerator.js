import { PairingGenerator } from './PairingGenerator';
import React from 'react';
import { connect } from 'react-redux';
const mapStateToProps = state => {
  return {
    pairings: state.pairings.pairings,
    year: state.lists.year
  };
};

const conditionalPairingGenerator = ({ pairings, year }) => {
  if (!pairings) {
    return <h1>Generating pairings for {year}...</h1>;
  }
  const currentYearLists = pairings.filter(l => l.year === year);
  if (currentYearLists.length === 0) {
    return <PairingGenerator />;
  }
  return <h6>Pairings already generated for {year}, see below!</h6>;
};
export const ConditionalPairingGenerator = connect(mapStateToProps)(
  conditionalPairingGenerator
);
