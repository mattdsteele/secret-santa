import React from 'react';
import { connect } from 'react-redux';
import { makePairings } from '../pairings/generate-pairings';
import { allValidPairings } from '../pairings/isValidPairing';
import { saveNewYear } from '../store/actions';
const mapStateToProps = (state) => {
  return {
    users: state.users.activeUsers,
    relationships: state.relationships.relationships,
    pairings: state.pairings.pairings,
    year: state.lists.year,
    yearsBack: state.lists.yearsBackToDisallow,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addPairings(pairs, year) {
      dispatch(saveNewYear(pairs, year));
    },
  };
};
const pairingGenerator = ({
  users,
  relationships,
  pairings,
  addPairings,
  year,
  yearsBack,
}) => {
  let pairingAttempt = 0;
  console.log('add pairings', addPairings);
  const makeValidPairings = (uids) => {
    pairingAttempt++;
    console.log('pairing attempt', pairingAttempt);
    const proposedPairings = makePairings([...uids]);
    if (
      allValidPairings(proposedPairings, pairings, relationships, yearsBack)
    ) {
      return proposedPairings;
    } else {
      return makeValidPairings(uids);
    }
  };
  if (
    users &&
    relationships &&
    pairings &&
    users.length > 0 &&
    relationships.length > 0 &&
    pairings.length > 0
  ) {
    const uids = users.map((u) => u.uid);
    const pairings = makeValidPairings(uids);

    const nameOfUser = (uid) => {
      return users.filter((user) => user.uid === uid)[0].displayName;
    };
    return (
      <>
        <div>
          <h1>New Pairings</h1>
          <ul>
            {pairings.map((p) => {
              return (
                <li key={`${p.gifter}-${p.giftee}`}>
                  {nameOfUser(p.gifter)} gifts to {nameOfUser(p.giftee)}
                </li>
              );
            })}
          </ul>
          <button onClick={() => addPairings(pairings, year)}>
            Save Pairings for {year}
          </button>
        </div>
      </>
    );
  } else {
    return <h1>Generating pairings for {year}...</h1>;
  }
};
export const PairingGenerator = connect(
  mapStateToProps,
  mapDispatchToProps
)(pairingGenerator);
