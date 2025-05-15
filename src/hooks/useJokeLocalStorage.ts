import { enqueueSnackbar } from "notistack";
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage"; // твій хук

import type { IJoke } from "../types/joke.type";
import { LocalStorageKeys } from "../types/common";

export function useJokeLocalStorage() {
  const [storedJokes, setStoredJokes, clearJokes] = useLocalStorage<IJoke>(
    LocalStorageKeys.JOKES,
    []
  );

  const addJoke = useCallback(
    (newJoke: IJoke) => {
      try {
        if (storedJokes.some((j) => j.id === newJoke.id)) {
          enqueueSnackbar("Joke already saved!", {
            variant: "info",
            autoHideDuration: 2000,
          });
          return;
        }

        setStoredJokes([...storedJokes, newJoke]);
      } catch (error) {
        console.warn("Failed to add joke:", error);
        enqueueSnackbar("Failed to add joke", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    },
    [storedJokes, setStoredJokes]
  );

  const removeJokeById = useCallback(
    (id: number) => {
      try {
        const filtered = storedJokes.filter((j) => j.id !== id);
        setStoredJokes(filtered);
      } catch (error) {
        console.warn("Failed to remove joke:", error);
        enqueueSnackbar("Failed to remove joke", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    },
    [storedJokes, setStoredJokes]
  );

  return {
    jokes: storedJokes,
    addJoke,
    removeJokeById,
    clearJokes,
  };
}
