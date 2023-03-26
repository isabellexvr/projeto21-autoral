import axios from "axios";
import { useState } from "react";
import { TopContainer, Background, SwitchThemes } from "../WelcomePage/Assets/styles";
import { useTheme } from "../../Contexts/ThemeContext";
import Switch from '@mui/material/Switch';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { themes } from "../../Contexts/ThemeContext";
import { BottomContainer } from "./Assets/styles";
import Form from "./Components/Form";

//TODO: colocar loader spinner pra enquanto a imagem estiver carregando

export default function LoginPage() {
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const { theme, setTheme } = useTheme();

    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const uploadImage = async (event: any) => {
        event.preventDefault();
        
        const file = event.target.files[0];
        const hashed = await convertBase64(file);
        setLoading(true);
        axios
            .post("http://localhost:3000/upload-images", { image: hashed })
            .then(res => {
                setUrl(res.data);
                console.log(res.data)
                console.log(loading)
                setLoading(false)
            })
            .catch(err => {
                alert("Algo deu errado ao importar a foto.")
                setLoading(false);
            })
    };
    return (
        <>
            <Background backgroundColor={theme.backgroundColor} fontColor={theme.fontColor}>
                <TopContainer>
                    <SwitchThemes>
                        <WbSunnyIcon />
                        <Switch color="warning" onClick={() => { setTheme(theme === themes.darkTheme ? themes.lightTheme : themes.darkTheme) }} />
                        <ModeNightIcon />
                    </SwitchThemes>
                </TopContainer>

                <BottomContainer>
                    <Form uploadImage={uploadImage} color={theme} loading={loading} url={url} />
                </BottomContainer>
            </Background>

        </>
    )
}

