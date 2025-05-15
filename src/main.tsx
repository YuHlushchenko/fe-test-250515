import { createRoot } from "react-dom/client";
import { SnackbarProvider } from "notistack";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <SnackbarProvider maxSnack={3}>
    <App />
  </SnackbarProvider>
);
