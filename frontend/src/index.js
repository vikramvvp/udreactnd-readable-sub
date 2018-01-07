import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import './index.css';
import reducer from './reducers';
import DefaultView from './components/DefaultView';
import ShowPostAddEdit from './containers/ShowPostAddEdit';
import PostDetails from './components/PostDetails';

import registerServiceWorker from './registerServiceWorker';

// react-router-redux help from:
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
// https://github.com/reactjs/react-router-redux/issues/545
// https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

//const initialState = {category: "all", sortCriteria:{sortField:"title", sortOrder:"asc"}}
const enhancers = []
// Build the middleware for intercepting and dispatching navigation actions
const middleware = [ thunk, routerMiddleware(history) ]

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)


const store = createStore(
  reducer,
  composedEnhancers
  // composeEnhancers(
  //   applyMiddleware(middleware)
  // )
)

//const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store} >
    <ConnectedRouter history={history}>
      <div className='container'>
        <Switch>
          <Route path="/posts/new" component={ShowPostAddEdit} />
          <Route path="/posts/edit/:id" component={ShowPostAddEdit} />
          <Route path="/posts/:id" component={PostDetails} />
          <Route exact path="/" component={DefaultView} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));

registerServiceWorker();
