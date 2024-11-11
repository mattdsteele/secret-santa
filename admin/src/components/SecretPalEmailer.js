import React from 'react';
import { httpsCallable } from '../store/firebase';
import { connect } from 'react-redux';
const emailSecretPal = httpsCallable('emailSecretPal');
const year = new Date().getFullYear();
const mapStateToProps = (state) => {
  return {
    users: state.users.activeUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    async emailMatt(userId) {
      const res = await emailSecretPal({ userId, year });
      console.log(res);
    },
    async emailEveryone(users) {
      console.log('emailing everyone', users);
      const results = await Promise.all(
        users.map((u) => emailSecretPal({ userId: u.uid, year }))
      );
      console.log(results);
    },
  };
};

const palEmailer = (props) => {
  return (
    <>
      <h1>Secret Pal Mailer</h1>
      {props.users &&
        props.users.map((user) => (
          <span key={user.uid}>
            <button onClick={() => props.emailMatt(user.uid)}>
              Email Secret Pal For: {user.email}
            </button>
          </span>
        ))}
      <p>
        <button onClick={() => props.emailEveryone(props.users)}>
          Email Secret Pal For Everyone
        </button>
      </p>
    </>
  );
};

export const PalEmailer = connect(
  mapStateToProps,
  mapDispatchToProps
)(palEmailer);
