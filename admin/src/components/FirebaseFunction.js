import React from 'react';
const DispatchFirebaseFunction = () => {
  const fire = () => {
    console.log('fired');
  };
  return (
    <div>
      <button onClick={() => fire()}>Fire and Forget</button>
    </div>
  );
};

export { DispatchFirebaseFunction };
