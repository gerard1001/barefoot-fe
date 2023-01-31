import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import AllRoutes from './routes';
import store from './redux/store';
import { socket, socketContext } from './helpers/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <socketContext.Provider value={socket}>
    <Provider store={store}>
      <AllRoutes />
    </Provider>
  </socketContext.Provider>,
);

module.hot.accept();
