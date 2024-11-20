import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        // Define default options
        className: "",
        duration: 4000,
        style: {
          background: "var(--background-accent)",
          color: "#fff",
          border: "3px solid red",
        },

        // Default options for specific types
        error: {
          theme: {
            primary: "red",
            secondary: "black",
          },
        },
      }}
    />
  </StrictMode>
);
