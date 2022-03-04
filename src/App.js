import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';

import { Form } from './components/Form';
import { store } from './redux/store';
import '../src/App.scss';

const App = () => (
  <Provider store={store}>
    <CssBaseline />
    <div className='App'>
      <Form />
    </div>
  </Provider>
);

export { App };
