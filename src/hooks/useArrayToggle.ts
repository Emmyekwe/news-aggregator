import { useCallback } from 'react';

export const useArrayToggle = <T>(
  array: T[],
  onChange: (newArray: T[]) => void
) => {
  return useCallback(
    (item: T) => {
      const newArray = array.includes(item)
        ? array.filter(i => i !== item)
        : [...array, item];
      onChange(newArray);
    },
    [array, onChange]
  );
};
