import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers/reducers'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css' // postCSS import of CSS module
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import Locations from './Locations'


const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

render(
  <Provider store={store}>

  <Router>
  <Switch>
    <Route path="/" component={App} exact={true}/>
    <Route path="/singlelocation" component={Locations} />
  </Switch>
  </Router>

  </Provider>,
  document.getElementById('root')
)
