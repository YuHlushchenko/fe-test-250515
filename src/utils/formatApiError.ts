import axios from "axios";

export const formatApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || "Unknown API error",
      status: error.response?.status || 500,
      isNetworkError: !error.response,
    };
  }

  return {
    message: "Unexpected error occurred",
    status: 500,
    isNetworkError: true,
  };
};
