import ThemeProvider from "./Contexts/ThemeContext";
import UserInfoProvider from "./Contexts/UserInfoContext";
import { useState } from "react";
import WelcomePage from "./Pages/WelcomePage";
import SignUpPage from "./Pages/SignUpPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./Pages/SignInPage";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <ThemeProvider>
      <UserInfoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="/sign-up"
              element={<SignUpPage loading={loading} setLoading={setLoading} />}
            />
            <Route path="/sign-in" element={<SignInPage />} />
          </Routes>
        </BrowserRouter>
      </UserInfoProvider>
    </ThemeProvider>
  );
}

export default App;
