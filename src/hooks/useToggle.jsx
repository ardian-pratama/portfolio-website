import { useCallback, useState } from 'react';

export default function useToggle(initialState) {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(
    (value) => setState((prev) => (typeof value === 'boolean' ? value : !prev)),
    []
  );

  return [state, toggle];
}
