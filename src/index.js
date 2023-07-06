import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { WorkoutContextProvider } from "./Context/WorkoutContext";

import App from "./App";
import { AuthContextProvider } from "./Context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutContextProvider>
        <App />
      </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
