import { create } from "zustand";

import type { IJoke } from "../types/joke.type";

type JokesStore = {
  jokes: IJoke[];
  setJokes(jokes: IJoke[]): void;
};

export const useJokeStore = create<JokesStore>((set) => ({
  jokes: [],
  setJokes: (jokes) => set({ jokes }),
}));
