import ThemeProvider from "./Contexts/ThemeContext";
import UserInfoProvider from "./Contexts/UserInfoContext";
import { useState } from "react";
import WelcomePage from "./Pages/HomePages/WelcomePage";
import SignUpPage from "./Pages/HomePages/SignUpPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./Pages/HomePages/SignInPage";
import TimelinePage from "./Pages/MainPages/TimelinePage";
import ProfilePage from "./Pages/MainPages/ProfilePage";
import CommunityPage from "./Pages/MainPages/CommunityPage";
import CreateCommunityPage from "./Pages/MainPages/CreateCommunityPage";

function App() {
  const [loading, setLoading] = useState(false);
  const [publicationModal, setPublicationModal] = useState(false);

  //todo: mandar essas variáveis invés de um por um
  const loadingStates = { loading, setLoading };

  const publicationModalStates = { publicationModal, setPublicationModal };

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
            <Route
              path="/sign-in"
              element={<SignInPage loading={loading} setLoading={setLoading} />}
            />
            <Route
              path="/timeline"
              element={
                <TimelinePage
                  publicationModal={publicationModal}
                  setPublicationModal={setPublicationModal}
                  loading={loading}
                  setLoading={setLoading}
                />
              }
            />
            <Route
              path="/user/:userName"
              element={
                <ProfilePage
                  publicationModal={publicationModal}
                  setPublicationModal={setPublicationModal}
                  loading={loading}
                  setLoading={setLoading}
                />
              }
            />
            <Route
              path="/community/:communityName"
              element={
                <CommunityPage
                  publicationModal={publicationModal}
                  setPublicationModal={setPublicationModal}
                  loading={loading}
                  setLoading={setLoading}
                />
              }
            />
            <Route
              path="/create-community"
              element={<CreateCommunityPage />}
              publicationModal={publicationModal}
              setPublicationModal={setPublicationModal}
              loading={loading}
              setLoading={setLoading}
            />
          </Routes>
        </BrowserRouter>
      </UserInfoProvider>
    </ThemeProvider>
  );
}

export default App;
