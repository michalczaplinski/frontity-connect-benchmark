import React from 'react'
import ReactDOM from 'react-dom'
import Main from './Main'
import { Provider } from './connect'
import store from './appStore';

ReactDOM.render(
  <Provider value={store}>
    <Main />
  </Provider>, document.getElementById('main'))
