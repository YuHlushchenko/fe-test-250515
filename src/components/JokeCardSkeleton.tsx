import { Box, Skeleton } from "@mui/material";

const JokeCardSkeleton = () => {
  return (
    <Box
      sx={{
        width: "347px",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflowY: "auto",
        borderRadius: "5px",
      }}
    >
      <Box>
        <Skeleton />
        <Skeleton width="60%" />
      </Box>

      <Skeleton
        variant="rectangular"
        height={"50%"}
        sx={{
          borderRadius: "5px",
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
          mt: 1,
        }}
      >
        <Skeleton
          variant="circular"
          width={30}
          height={30}
          sx={{
            marginRight: "10px",
          }}
        />
        <Skeleton
          variant="circular"
          width={30}
          height={30}
          sx={{
            marginRight: "10px",
          }}
        />
        <Skeleton variant="circular" width={30} height={30} />
      </Box>
    </Box>
  );
};

export default JokeCardSkeleton;
