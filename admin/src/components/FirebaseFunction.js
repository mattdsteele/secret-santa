import React from 'react';
import { functions } from '../store/firebase';
const sendTestEmail = functions.httpsCallable('sendTestEmail');

const DispatchFirebaseFunction = () => {
  const email = async address => {
    const data = await sendTestEmail(address);
    console.log(data);
  };

  return (
    <div>
      <button onClick={() => email('orphum@gmail.com')}>
        Send me an email
      </button>
      <button onClick={() => email('jcake2@gmail.com')}>
        Send Jessica an email
      </button>
    </div>
  );
};

export { DispatchFirebaseFunction };
