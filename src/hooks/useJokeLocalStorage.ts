import { enqueueSnackbar } from "notistack";

import { useLocalStorage } from "./useLocalStorage";

import type { IJoke } from "../types/joke.type";
import { LocalStorageKeys } from "../types/common";

export const useJokesStorage = () =>
  useLocalStorage<IJoke[]>(LocalStorageKeys.JOKES, [], {
    validate: (value): value is IJoke[] => Array.isArray(value),
    onError: () => {
      enqueueSnackbar("Failed to work with jokes local storage", {
        variant: "error",
      });
    },
  });
