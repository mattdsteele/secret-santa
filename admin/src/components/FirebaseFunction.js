import React from 'react';
import { httpsCallable } from '../store/firebase';
const sendTestEmail = httpsCallable('sendTestEmail');

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
