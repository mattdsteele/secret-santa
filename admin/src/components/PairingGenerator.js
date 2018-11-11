import React from 'react';
import { connect } from 'react-redux';
import { makePairings } from '../pairings/generate-pairings';
import { allValidPairings } from '../pairings/isValidPairing';
const mapStateToProps = state => {
  return {
    users: state.users.usersList,
    relationships: state.relationships.relationships,
    pairings: state.pairings.pairings
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
const pairingGenerator = ({ users, relationships, pairings }) => {
  let pairingAttempt = 0;
  const makeValidPairings = uids => {
    pairingAttempt++;
    console.log('pairing attempt', pairingAttempt);
    const proposedPairings = makePairings([...uids]);
    if (allValidPairings(proposedPairings, pairings, relationships)) {
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
    const uids = users.map(u => u.uid);
    const pairings = makeValidPairings(uids);

    const nameOfUser = uid => {
      return users.filter(user => user.uid === uid)[0].displayName;
    };
    return (
      <>
        <h1>New Pairings</h1>
        <ul>
          {pairings.map(p => {
            return (
              <li>
                {nameOfUser(p.gifter)} gifts to {nameOfUser(p.giftee)}
              </li>
            );
          })}
        </ul>
      </>
    );
  } else {
    return <h1>Generating pairings...</h1>;
  }
};
export const PairingGenerator = connect(
  mapStateToProps,
  mapDispatchToProps
)(pairingGenerator);