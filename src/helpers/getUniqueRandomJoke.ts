import { joke_api } from "../api/joke.api";
import type { IJoke } from "../types/joke.type";

export const getUniqueRandomJoke = async (
  existingJokeIds: number[],
  retries = 3
): Promise<IJoke> => {
  for (let attempt = 0; attempt < retries; attempt++) {
    const joke = await joke_api.getRandom();

    if (!existingJokeIds.includes(joke.id)) {
      return joke;
    }
  }
  throw new Error("Failed to get a unique joke after multiple attempts");
};
