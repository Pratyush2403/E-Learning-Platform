import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./Context/AuthContext";
import { EnrollmentProvider } from "./Context/EnrollmentContext";
import { ProgressProvider } from "./Context/ProgressContext";
import "./index.css";

// set the theme before rendering so the page never flashes the wrong colors
const savedTheme = (() => {
  try {
    return localStorage.getItem("lh_theme");
  } catch {
    return null;
  }
})();
const startTheme =
  savedTheme ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.documentElement.setAttribute("data-theme", startTheme);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EnrollmentProvider>
          <ProgressProvider>
            <App />
          </ProgressProvider>
        </EnrollmentProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);