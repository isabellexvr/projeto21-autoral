import ThemeProvider from "./Contexts/ThemeContext";
import UserInfoProvider from "./Contexts/UserInfoContext";
import { useState } from "react";
import WelcomePage from "./Pages/HomePages/WelcomePage";
import SignUpPage from "./Pages/HomePages/SignUpPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./Pages/HomePages/SignInPage";
import TimelinePage from "./Pages/MainPages/TimelinePage";
import ProfilePage from "./Pages/MainPages/ProfilePage";

function App() {
  const [loading, setLoading] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);

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
            <Route path="/timeline" element={<TimelinePage isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} />}/>
            <Route path="/user" element={<ProfilePage isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} />}/>
          </Routes>
        </BrowserRouter>
      </UserInfoProvider>
    </ThemeProvider>
  );
}

export default App;
