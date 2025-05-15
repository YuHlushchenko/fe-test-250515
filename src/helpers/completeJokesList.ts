import type { IJoke } from "../types/joke.type";
import { joke_api } from "../api/joke.api";
import { removeDuplicates } from "../utils/removeDuplicates";
import { removeExtraJokes } from "./removeExtraJokes";

export const completeJokesList = async (jokes: IJoke[]): Promise<IJoke[]> => {
  const uniqueJokes = removeDuplicates(jokes, "id");

  if (uniqueJokes.length > 0 && uniqueJokes.length % 10 === 0) {
    return uniqueJokes;
  }

  try {
    const data = await joke_api.getTen();

    if (data.length === 0) {
      return uniqueJokes;
    }

    const combined = removeDuplicates([...uniqueJokes, ...data], "id");

    if (combined.length % 10 === 0) {
      return combined;
    }

    if (combined.length / 10 > 1) {
      return removeExtraJokes(combined);
    }

    return await completeJokesList(combined);
  } catch (error) {
    console.error("Error fetching jokes", error);

    return jokes;
  }
};
