import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T[]
): [T[], (value: T[]) => void, () => void] {
  // Read from localStorage only on first mount
  const readValue = useCallback((): T[] => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Failed to read localStorage key “${key}”:`, error);
      enqueueSnackbar("Failed to read localStorage key", {
        variant: "warning",
        autoHideDuration: 2000,
      });

      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValueState] = useState<T[]>(readValue);

  const setValue = useCallback(
    (value: T[]) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        setStoredValueState(value);

        // Dispatch custom event to notify all listeners inside the same tab
        window.dispatchEvent(new Event("local-storage-change"));
      } catch (error) {
        console.warn(`Failed to set localStorage key “${key}”:`, error);
        enqueueSnackbar("Failed to set localStorage key", {
          variant: "warning",
          autoHideDuration: 2000,
        });
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setStoredValueState(initialValue);
      window.dispatchEvent(new Event("local-storage-change"));
    } catch (error) {
      console.warn(`Failed to remove localStorage key “${key}”:`, error);
      enqueueSnackbar("Failed to remove localStorage key", {
        variant: "warning",
        autoHideDuration: 2000,
      });
    }
  }, [key, initialValue]);

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValueState(readValue());
    };

    // Listen to both native 'storage' (cross-tab) and custom 'local-storage-change' (same tab)
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("local-storage-change", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage-change", handleStorageChange);
    };
  }, [readValue]);

  return [storedValue, setValue, removeValue];
}
