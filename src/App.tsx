import * as React from 'react';

import Loader from './components/Loader';
import { useAuth } from './context/AuthContext';

const Authenticated = React.lazy(() => import('./screens/Authenticated'));
const UnAuthenticated = React.lazy(() => import('./screens/UnAuthenticated'));

function App(): JSX.Element {
  const { token } = useAuth();

  return (
    <React.Suspense fallback={<Loader />}>
      {token ? <Authenticated /> : <UnAuthenticated />}
    </React.Suspense>
  );
}

export default App;
