import { useEffect, useState } from "react";
import { useJokeStore } from "./store/joke.store";
import type { IJoke } from "./types/joke.type";
import { useJokeLocalStorage } from "./hooks/useJokeLocalStorage";
import LoadMoreBtn from "./components/LoadMoreBtn";
import JokeCard from "./components/JokeCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { completeJokesList } from "./helpers/completeJokesList";

function App() {
  const jokes = useJokeStore((state) => state.jokes);
  const setJokes = useJokeStore((state) => state.setJokes);

  const [isLoading, setLoading] = useState(false);
  const { jokes: jokesFromLocalStorage } = useJokeLocalStorage();

  const fetchJokes = async () => {
    setLoading(true);
    try {
      if (jokesFromLocalStorage.length > 0) {
        setJokes(jokesFromLocalStorage);

        if (jokesFromLocalStorage.length % 10 === 0) {
          return;
        }
      }

      const updatedJokes = await completeJokesList(jokesFromLocalStorage);

      setJokes(updatedJokes);
    } catch (error) {
      console.error("Error fetching jokes in App:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <Typography variant="h2" color="primary" mb={4}>
        Jokes App
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "20px",
          mb: "30px",
        }}
      >
        {jokes.length > 0 ? (
          jokes.map((joke: IJoke) => <JokeCard key={joke.id} joke={joke} />)
        ) : (
          <Typography variant="h4" color="primary">
            No jokes found
          </Typography>
        )}
      </Box>

      <LoadMoreBtn isLoading={isLoading} setLoading={setLoading} />
    </Box>
  );
}

export default App;
