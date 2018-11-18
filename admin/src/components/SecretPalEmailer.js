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
      console.log(`emailing ${userId}`);
      const res = await emailSecretPal({ userId, year: 2018 });
      console.log(res);
    }
  };
};

const palEmailer = props => {
  return (
    <>
      {props.users &&
        props.users
          .filter(user => user.email === 'orphum@gmail.com')
          .map(user => (
            <p key={user.uid}>
              <button onClick={() => props.emailMatt(user.uid)}>
                User: {user.email}
              </button>
            </p>
          ))}
    </>
  );
};

export const PalEmailer = connect(
  mapStateToProps,
  mapDispatchToProps
)(palEmailer);
