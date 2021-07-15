import * as React from 'react';

type AsyncReturn<DataType> = {
  status: string;
  data: DataType | null | undefined;
  error: Error | null | undefined;
  run: (promise: Promise<DataType>) => void;
  setData: (param: DataType) => void;
  setError: (param: Error) => void;
};

type AsyncState<DataType> =
  | {
      status: 'idle' | 'pending';
      data?: null;
      error?: null;
    }
  | {
      status: 'resolved';
      data: DataType;
      error: null;
    }
  | {
      status: 'rejected';
      data: null;
      error: Error;
    };

type AsyncAction<DataType> =
  | { type: 'reset' }
  | { type: 'pending' }
  | { type: 'resolved'; data: DataType }
  | { type: 'rejected'; error: Error };

function useSafeDispatch<Action>(dispatch: React.Dispatch<Action>) {
  const mounted = React.useRef(false);

  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    (...args: Parameters<React.Dispatch<Action>>) => {
      if (mounted.current) {
        dispatch(...args);
      }
    },
    [dispatch]
  );
}

function asyncReducer<DataType>(
  state: AsyncState<DataType>,
  action: AsyncAction<DataType>
) {
  switch (action.type) {
    case 'pending':
      return { status: 'pending' as const, data: null, error: null };
    case 'resolved':
      return { status: 'resolved' as const, data: action.data, error: null };
    case 'rejected':
      return { status: 'rejected' as const, data: null, error: action.error };
    default:
      throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
  }
}

function useAsync<DataType>(
  initialState?: AsyncState<DataType>
): AsyncReturn<DataType> {
  const [state, unSafeDispatch] = React.useReducer<
    React.Reducer<AsyncState<DataType>, AsyncAction<DataType>>
  >(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });

  const dispatch = useSafeDispatch(unSafeDispatch);

  const { status, data, error } = state;

  const run = React.useCallback(
    (promise: Promise<DataType>) => {
      dispatch({ type: 'pending' });
      promise
        .then((responseData: DataType) => {
          dispatch({ type: 'resolved', data: responseData });
        })
        .catch((responseError: Error) => {
          dispatch({ type: 'rejected', error: responseError });
        });
    },
    [dispatch]
  );

  const setData = React.useCallback(
    (responseData: DataType) => {
      dispatch({ type: 'resolved', data: responseData });
    },
    [dispatch]
  );

  const setError = React.useCallback(
    (responseError: Error) => {
      dispatch({ type: 'rejected', error: responseError });
    },
    [dispatch]
  );

  return {
    status,
    data,
    error,
    run,
    setData,
    setError,
  };
}

export default useAsync;
