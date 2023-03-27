import ThemeProvider from "./Contexts/ThemeContext";
import { useState } from "react";
import WelcomePage from "./Pages/WelcomePage";
import SignUpPage from "./Pages/SignUpPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useTheme } from "./Contexts/ThemeContext";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<WelcomePage />}
          />
          <Route
            path="/sign-up"
            element={<SignUpPage  loading={loading} setLoading={setLoading} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
