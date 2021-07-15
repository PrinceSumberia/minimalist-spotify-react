import * as React from 'react';

import { useAuth } from '../context/AuthContext';
import { logout } from '../utils/auth';

interface ClientParams {
  data?: any;
  token?: string;
  headers?: Record<string, unknown>;
}

function client(
  endpoint: string,
  { data, token, headers: customHeaders, ...customConfig }: ClientParams = {}
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  return window
    .fetch(endpoint, config as RequestInit)
    .then(async (response) => {
      if (response.status === 401) {
        logout();
        return Promise.reject(new Error('Please re-authenticate.'));
      }
      let responseData;
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        responseData = await response.json();
      } catch (error) {
        responseData = response;
      }
      if (response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return responseData;
      }
      return Promise.reject(responseData);
    });
}

function useClient() {
  const { token } = useAuth();
  return React.useCallback(
    (endpoint, config = {}) => client(endpoint, { ...config, token }),
    [token]
  );
}

export default useClient;
