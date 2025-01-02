import { useEffect, useState } from "react";

/**
 * 무분별한 호출을 방지하기 위한 딜레이 hooks
 * @param value
 * @param delay
 * @returns
 */
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
