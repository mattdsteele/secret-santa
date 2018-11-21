import React from 'react';
import { functions } from '../store/firebase';
import { connect } from 'react-redux';
const emailSecretPal = functions.httpsCallable('emailSecretPal');
const mapStateToProps = state => {
  return {
    users: state.users.usersList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    async emailMatt(userId) {
      const res = await emailSecretPal({ userId, year: 2018 });
      console.log(res);
    },
    async emailEveryone(users) {
      console.log('emailing everyone', users);
      const results = await Promise.all(
        users.map(u => emailSecretPal({ userId: u.uid, year: 2018 }))
      );
      console.log(results);
    }
  };
};

const palEmailer = props => {
  return (
    <>
      {props.users &&
        props.users.map(user => (
          <p key={user.uid}>
            <button onClick={() => props.emailMatt(user.uid)}>
              User: {user.email}
            </button>
          </p>
        ))}
      <button onClick={() => props.emailEveryone(props.users)}>
        Email everyone
      </button>
    </>
  );
};

export const PalEmailer = connect(
  mapStateToProps,
  mapDispatchToProps
)(palEmailer);
