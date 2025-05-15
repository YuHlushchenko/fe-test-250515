import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    validate?: (value: unknown) => value is T;
    onError?: (error: unknown) => void;
  }
): [T, (value: T) => void, () => void] {
  const safeParse = (raw: string | null): T => {
    try {
      if (!raw) return initialValue;

      const parsed = JSON.parse(raw);

      // Check if the parsed value matches the expected type
      if (options?.validate && !options.validate(parsed)) {
        throw new Error(`Invalid data format`);
      }

      return parsed;
    } catch (error) {
      options?.onError?.(error);

      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(() =>
    safeParse(localStorage.getItem(key))
  );

  const setValue = useCallback(
    (value: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        setStoredValue(value);
      } catch (error) {
        options?.onError?.(error);
      }
    },
    [key, options]
  );

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);

      setStoredValue(initialValue);
    } catch (error) {
      options?.onError?.(error);
    }
  }, [key, initialValue, options]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key) setStoredValue(safeParse(e.newValue));
    };

    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);

  return [storedValue, setValue, removeValue];
}
