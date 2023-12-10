import { useEffect, useRef, useState } from 'react';

type useDebounceParams<T> = {
  value: T;
  delay?: number;
  callback?: (value: T) => void;
};

export const useDebounce = <T = unknown>({
  value,
  delay,
  callback,
}: useDebounceParams<T>) => {
  const [debounced, setDebounced] = useState<T>(value);
  const callbackRef = useRef(callback);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounced(value);

      if (callbackRef.current) {
        callbackRef.current(value);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debounced;
};
