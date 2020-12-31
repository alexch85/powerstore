import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { createStore , applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

import CartManageReducer from './store/reducers/cartManage';
import AuthReducer from './store/reducers/auth';
import OrdersReducer from './store/reducers/orders';

import * as serviceWorker from './serviceWorker';


//redux development tools
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;


//Using multiple reducers
const rootReducer = combineReducers({
   CartManage : CartManageReducer,
   auth: AuthReducer,
   orders: OrdersReducer
})

//Persisting state
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'CartManage']
}

const persistRed = persistReducer(persistConfig, rootReducer);

const store = createStore(persistRed,composeEnhancers((applyMiddleware(thunk))));

const persistor = persistStore(store);

const app = (
  <Provider store={store}>
    <BrowserRouter>
    <PersistGate persistor={persistor}>
       <App />
    </PersistGate>
    </BrowserRouter>
  </Provider>
);


ReactDOM.render(
  <React.StrictMode>
  {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
