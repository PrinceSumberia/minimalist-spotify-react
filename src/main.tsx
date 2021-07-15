import * as React from 'react';

import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { AuthProvider } from './context/AuthContext';

import './index.scss';

function AppWithProviders() {
  return (
    <React.StrictMode>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </React.StrictMode>
  );
}

ReactDOM.render(<AppWithProviders />, document.getElementById('root'));
