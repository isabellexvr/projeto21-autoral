import Footer from "../Constants/Footer";
import Header from "../Constants/Header";
import { Background } from "../Constants/styles";
import { useTheme } from "../../../Contexts/ThemeContext";

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();

  return (
    <Background>
      <Header theme={theme} />
      <Footer theme={theme} setIsModalOpened={setIsModalOpened} />
      <ModalStyle
        shouldCloseOnOverlayClick={true}
        onRequestClose={handleCloseModal}
        style={modalStyles}
        isOpen={isModalOpened}
      >
        <NewPostForm
          userInfo={userInfo}
          theme={theme}
          setIsModalOpened={setIsModalOpened}
          loading={loading}
          setLoading={setLoading}
        />
      </ModalStyle>
    </Background>
  );
}
