import React from 'react';
import { functions } from '../store/firebase';
const helloWorld = functions.httpsCallable('helloWorld');
const sendTestEmail = functions.httpsCallable('sendTestEmail');

const DispatchFirebaseFunction = () => {
  const fire = async () => {
    console.log('fired');
    const result = await helloWorld('my name is judge');
    // Read result of the Cloud Function.
    var sanitizedMessage = result.data;
    console.log(sanitizedMessage);
  };
  const email = async address => {
    const { data } = await sendTestEmail(address);
    console.log(`got data: ${data}`);
  };

  return (
    <div>
      <button onClick={() => fire()}>Fire and Forget</button>
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
