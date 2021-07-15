import * as React from 'react';

import { AUTH_URL } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { getHash } from '../../utils/helpers';
import './UnAuthenticatedStyles.scss';

const UnAuthenticated = () => {
  const { register } = useAuth();

  React.useEffect(() => {
    const { access_token: accessToken } = getHash();

    if (accessToken) {
      register(accessToken);
    }
  }, []);

  return (
    <div className="login">
      <h4 className="login__heading">
        Please login with your Spotify account.
      </h4>
      <a className="login__btn" href={AUTH_URL}>
        Login with Spotify
      </a>
    </div>
  );
};

export default UnAuthenticated;
