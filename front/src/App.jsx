import ThemeProvider from "./Contexts/ThemeContext";
import UserInfoProvider from "./Contexts/UserInfoContext";
import { useState } from "react";
import WelcomePage from "./Pages/HomePages/WelcomePage";
import SignUpPage from "./Pages/HomePages/SignUpPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./Pages/HomePages/SignInPage";
import TimelinePage from "./Pages/MainPages/TimelinePage";

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
            <Route path="/sign-in" element={<SignInPage loading={loading} setLoading={setLoading} />} />
            <Route path="/timeline" element={<TimelinePage/>}/>
          </Routes>
        </BrowserRouter>
      </UserInfoProvider>
    </ThemeProvider>
  );
}

export default App;
