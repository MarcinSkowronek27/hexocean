import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';

import { FormComponent } from './components/Form';
import { store } from './redux/store';
import '../src/App.scss';

const App = () => (
  <Provider store={store}>
    <CssBaseline />
    <div className='App'>
      <FormComponent />
    </div>
  </Provider>
);

export { App };
