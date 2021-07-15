import * as React from 'react';

const useViewport = () => {
  const windowWidth = React.useRef(window.innerWidth);

  React.useLayoutEffect(() => {
    const handleWindowResize = () => {
      windowWidth.current = window.innerWidth;
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [window.innerWidth]);

  return windowWidth.current;
};

export default useViewport;
