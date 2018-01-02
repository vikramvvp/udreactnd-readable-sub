import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DefaultView from './components/DefaultView';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

//const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <DefaultView />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

registerServiceWorker();
