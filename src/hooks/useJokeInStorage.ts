import { useLocalStorage } from "./useLocalStorage";

import type { IJoke } from "../types/joke.type";
import { LocalStorageKeys } from "../types/common";

export const useJokeInStorage = (jokeId: number): boolean => {
  const [jokes] = useLocalStorage<IJoke>(LocalStorageKeys.JOKES, []);
  return jokes.some((j) => j.id === jokeId);
};
