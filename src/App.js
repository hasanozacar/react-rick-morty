import React from 'react';
import AppRouter from './Router';
import { Provider } from 'react-redux';
import store from './store/store'; // Redux store'unu içeri aktardığınızdan emin olun

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRouter />
      </div>
    </Provider>
  );
}

export default App;
