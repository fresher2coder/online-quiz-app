import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import "./index.css";
import App from "./App.jsx";
import AppRouter from "./router.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <AppRouter />
  </ThemeProvider>
);
