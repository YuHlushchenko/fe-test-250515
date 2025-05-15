import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { completeJokesList } from "../helpers/completeJokesList";
import { useJokeStore } from "../store/joke.store";
import { joke_api } from "../api/joke.api";

interface IProps {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadMoreBtn = ({ isLoading, setLoading }: IProps) => {
  const jokes = useJokeStore((state) => state.jokes);
  const setJokes = useJokeStore((state) => state.setJokes);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const newData = await joke_api.getTen();
      const combined = [...jokes, ...newData];
      const completed = await completeJokesList(combined);
      setJokes(completed);
    } catch (error) {
      console.error("Error loading more jokes", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleFetch}
      variant="contained"
      size="large"
      startIcon={<AddIcon />}
      loading={isLoading}
      loadingPosition="start"
    >
      Load More
    </Button>
  );
};

export default LoadMoreBtn;
