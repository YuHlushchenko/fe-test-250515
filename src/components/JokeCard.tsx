import { useState } from "react";

import type { IJoke } from "../types/joke.type";
import { useJokeInStorage } from "../hooks/useJokeInStorage";

import JokeCardSkeleton from "./JokeCardSkeleton";

import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import JokeCardActions from "./JokeCardActions";

interface IProps {
  joke: IJoke;
}

const JokeCard = ({ joke }: IProps) => {
  const [isLoading, setLoading] = useState(false);
  const isJokeInLocalStorage = useJokeInStorage(joke.id);

  if (isLoading) return <JokeCardSkeleton />;

  return (
    <Card
      variant="outlined"
      sx={{
        width: 345,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
        position: "relative",
        "&:hover .joke-card-actions-container": {
          opacity: 1,
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            gutterBottom
            variant="body1"
          >{`Type: ${joke.type}`}</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >{`#${joke.id}`}</Typography>
        </Box>

        <Box
          sx={{
            borderLeft: "5px solid #3f51b5",
            borderRadius: "5px",
            p: "10px",
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            color="primary"
            sx={{ lineHeight: "1.2", fontWeight: "bold", fontStyle: "italic" }}
          >
            {joke.setup}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: "1.2", fontStyle: "italic" }}
          >
            {joke.punchline}
          </Typography>
        </Box>
      </CardContent>

      <CardActions
        className={isJokeInLocalStorage ? "" : "joke-card-actions-container"}
        sx={{
          backgroundColor: "grey.200",
          p: 1,
          borderRadius: "5px 5px 0 0",
          opacity: isJokeInLocalStorage ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <JokeCardActions joke={joke} setLoading={setLoading} />
      </CardActions>
    </Card>
  );
};

export default JokeCard;
