import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AllUsers } from './components/AllUsers';
import { BurtMailer } from './components/BurtMailer';
import { DispatchFirebaseFunction } from './components/FirebaseFunction';
import { PairingGenerator } from './components/PairingGenerator';
import { PairingHistory } from './components/PairingHistory';
import { Pairings } from './components/Pairings';
import { Relationships } from './components/Relationships';
import { UserStatus } from './components/UserStatus';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { store } from './store';

const Main = () => {
  return (
    <>
      <PairingGenerator />
      <Relationships />
      <Pairings />
      <PairingHistory />
      <AllUsers />
      <UserStatus />
      <DispatchFirebaseFunction />
      <BurtMailer />
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
