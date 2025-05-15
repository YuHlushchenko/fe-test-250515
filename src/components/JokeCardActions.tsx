import { useSnackbar } from "notistack";
import { replaceElement } from "../utils/replaceAt";
import { useJokeStore } from "../store/joke.store";
import { getUniqueRandomJoke } from "../helpers/getUniqueRandomJoke";
import { useJokeLocalStorage } from "../hooks/useJokeLocalStorage";

import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import type { IJoke } from "../types/joke.type";

interface IProps {
  joke: IJoke;
  setLoading: (loading: boolean) => void;
}

const JokeCardActions = ({ joke, setLoading }: IProps) => {
  const jokes = useJokeStore((state) => state.jokes);
  const setJokes = useJokeStore((state) => state.setJokes);

  const { enqueueSnackbar } = useSnackbar();
  const { jokes: savedJokes, addJoke, removeJokeById } = useJokeLocalStorage();

  const isJokeSaved = savedJokes.some((saved) => saved.id === joke.id);

  const toggleSaveJoke = () => {
    if (isJokeSaved) {
      removeJokeById(joke.id);
    } else {
      addJoke(joke);
    }
  };

  const removeJoke = (joke: IJoke) => {
    if (isJokeSaved) {
      removeJokeById(joke.id);
    }

    const updatedJokesArray = jokes.filter((j) => j.id !== joke.id);
    setJokes(updatedJokesArray);
  };

  const refreshJoke = async (joke: IJoke, index: number) => {
    setLoading(true);
    try {
      const randomJoke = await getUniqueRandomJoke(
        jokes.map((j) => j.id),
        5
      );

      if (savedJokes.some((savedJoke) => savedJoke.id === joke.id)) {
        removeJokeById(joke.id);
      }

      const updatedJokes = replaceElement(jokes, index, randomJoke);
      setJokes(updatedJokes);
    } catch (error) {
      console.error("Error fetching a new joke", error);
      enqueueSnackbar("Error fetching a new joke", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip
        title={isJokeSaved ? "Remove from saved" : "Save joke"}
        arrow
        placement="top"
      >
        <IconButton
          aria-label={isJokeSaved ? "remove from saved" : "save"}
          color="primary"
          onClick={toggleSaveJoke}
        >
          {isJokeSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete joke" arrow placement="top">
        <IconButton
          aria-label="remove"
          color="error"
          onClick={() => removeJoke(joke)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Refresh joke" arrow placement="top">
        <IconButton
          color="secondary"
          aria-label="refresh"
          onClick={() => refreshJoke(joke, jokes.indexOf(joke))}
        >
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default JokeCardActions;
