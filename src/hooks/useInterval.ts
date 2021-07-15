import * as React from 'react';

type IntervalFunction = () => unknown | void;

function useInterval(callback: IntervalFunction, delay: number | null) {
  const savedCallback = React.useRef<IntervalFunction | undefined>();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
