import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import reducer from './reducers';
import DefaultView from './components/DefaultView';
import PostAddEdit from './components/PostAddEdit';
import PostDetails from './components/PostDetails';

import registerServiceWorker from './registerServiceWorker';

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
      <div className='container'>
        <Switch>
          <Route path="/posts/new" component={PostAddEdit} />
          <Route path="/posts/:id" component={PostDetails} />
          <Route exact path="/" component={DefaultView} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

registerServiceWorker();
