import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { store } from './store';
import { AllUsers } from './components/AllUsers';
import { UserStatus } from './components/UserStatus';
import { DispatchFirebaseFunction } from './components/FirebaseFunction';
const Main = () => {
  return (
    <>
      <AllUsers />
      <UserStatus />
      <DispatchFirebaseFunction />
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
