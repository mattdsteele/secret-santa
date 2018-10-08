import React from 'react';
import { functions } from '../store/firebase';
const helloWorld = functions.httpsCallable('helloWorld');

const DispatchFirebaseFunction = () => {
  const fire = async () => {
    console.log('fired');
    const result = await helloWorld('my name is judge');
    // Read result of the Cloud Function.
    var sanitizedMessage = result.data;
    console.log(sanitizedMessage);
  };

  return (
    <div>
      <button onClick={() => fire()}>Fire and Forget</button>
    </div>
  );
};

export { DispatchFirebaseFunction };
