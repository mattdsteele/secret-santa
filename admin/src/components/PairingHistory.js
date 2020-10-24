import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getAllPairings } from '../store/actions';

const mapStateToProps = (store) => {
  return {
    users: store.users.usersList,
    pairings: store.pairings.pairings,
  };
};
const mapDispatchToProps = (dispatch) => {
  dispatch(getAllPairings());
  return {};
};

const pairingHistory = (props) => {
  const [visible, setVisible] = useState(false);
  const userFor = (id) => {
    return props.users.filter((u) => u.uid === id)[0];
  };
  const name = (id) => userFor(id).displayName;
  return (
    <>
      <h1 onClick={() => setVisible(!visible)}>
        Pairings History (click to show)
      </h1>
      <div className={visible ? '' : 'hidden'}>
        {props.pairings && props.users && (
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Gifter</th>
                <th>Giftee</th>
              </tr>
            </thead>
            <tbody>
              {props.pairings.map(({ year, gifter, giftee }) => (
                <tr key={`${year}-${name(gifter)}`}>
                  <td>{year}</td>
                  <td>{name(gifter)}</td>
                  <td>{name(giftee)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
export const PairingHistory = connect(
  mapStateToProps,
  mapDispatchToProps
)(pairingHistory);
