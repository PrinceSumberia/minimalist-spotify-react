import * as React from 'react';

function useInputState(initialValue = '') {
  const [value, setValue] = React.useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return { value, handleChange, reset };
}

export default useInputState;
