import React from 'react';
import { Provider } from 'react-redux';
import { AllUsers } from './components/AllUsers';
import { BurtMailer } from './components/BurtMailer';
import { ConditionalPairingGenerator } from './components/ConditionalPairingGenerator';
import { DispatchFirebaseFunction } from './components/FirebaseFunction';
import { PairingHistory } from './components/PairingHistory';
import { Relationships } from './components/Relationships';
import { UserStatus } from './components/UserStatus';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { store } from './store';
import { PalEmailer } from './components/SecretPalEmailer';
import {createRoot} from 'react-dom/client'

const Main = () => {
  return (
    <>
      <ConditionalPairingGenerator />
      <Relationships />
      {/* <Pairings /> */}
      <PairingHistory />
      <AllUsers />
      <UserStatus />
      <DispatchFirebaseFunction />
      <BurtMailer />
      <PalEmailer />
    </>
  );
};
const main = (
  <Provider store={store}>
    <Main />
  </Provider>
);
const root = createRoot(document.getElementById('root'));
root.render(main);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
