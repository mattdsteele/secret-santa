import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AllUsers } from './components/AllUsers';
import { BurtMailer } from './components/BurtMailer';
import { ConditionalPairingGenerator } from './components/ConditionalPairingGenerator';
import { DispatchFirebaseFunction } from './components/FirebaseFunction';
import { PairingHistory } from './components/PairingHistory';
import { Pairings } from './components/Pairings';
import { Relationships } from './components/Relationships';
import { UserStatus } from './components/UserStatus';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { store } from './store';
import { PalEmailer } from './components/SecretPalEmailer';
import { DefaultListMaker } from './components/DefaultListMaker';

const Main = () => {
  return (
    <>
      <DefaultListMaker />
      <ConditionalPairingGenerator />
      <Relationships />
      <Pairings />
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
ReactDOM.render(main, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
