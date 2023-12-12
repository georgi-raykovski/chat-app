import React from "react";

export const useEnterPress = <T extends HTMLElement>(
  callback: () => void
): React.KeyboardEventHandler<T> => {
  return React.useCallback((e: React.KeyboardEvent<T>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      callback();
    }
  }, [callback]);
};
