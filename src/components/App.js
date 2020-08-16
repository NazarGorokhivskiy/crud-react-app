import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { GlobalProvider } from '../context/globalState';
import AppRouter from './AppRouter';
import ErrorAlert from './shared/ErrorAlert';

function App () {
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <GlobalProvider value={{ setErrorMessage }}>
      <AppRouter/>
      {errorMessage && <ErrorAlert message={errorMessage}/>}
    </GlobalProvider>
  );
}

export default App;
