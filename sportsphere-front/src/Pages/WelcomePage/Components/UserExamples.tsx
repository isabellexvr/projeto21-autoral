import styled from "styled-components"
import { useTheme } from "../../../Contexts/ThemeContext"
import { ThemeProps } from "../../../Types";
import { colors } from "../../../assets/colors";

const mockedData = [
    {
        name: "John",
        picture: "https://t4.ftcdn.net/jpg/03/98/85/77/360_F_398857704_n44BPhqM68Xk9vT31BeFkLQwWsgeZS6C.jpg",
        communityIcon: "https://yoolk.ninja/wp-content/uploads/2020/06/Games-Valorant-1024x1024.png"
    },
    {
        name: "Sam",
        picture: "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlJTIwc21pbGV8ZW58MHx8MHx8&w=1000&q=80",
        communityIcon: "https://simsvip.com/wp-content/uploads/2014/08/BwOt1a3CUAA0DGG.png"
    },
    {
        name: "",
        picture: "",
        communityIcon: "https://cdn4.iconfinder.com/data/icons/50-chess/512/Chess_9-512.png"
    },
    {
        name: "",
        picture: "",
        communityIcon: "https://cdn-icons-png.flaticon.com/512/1273/1273737.png"
    },
    {
        name: "",
        picture: "",
        communityIcon: "https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/exercise-circle-orange-512.png"
    },
    {
        name: "",
        picture: "",
        communityIcon: "https://www.freeiconspng.com/thumbs/exercise-icon/exercise-icon-1.png"
    },
    {
        name: "",
        picture: "",
        communityIcon: "https://icon-library.com/images/volleyball-icon/volleyball-icon-12.jpg"
    },
    {
        name: "",
        picture: "",
        communityIcon: "https://gooutside.com.br/wp-content/uploads/sites/3/2021/07/3-icon-ciclismo-1.png"
    },
    {
        name: "",
        picture: "",
        communityIcon: "https://www.freeiconspng.com/thumbs/exercise-icon/exercise-icon-1.png"
    },
]

export function UserExamples() {
    const { theme, setTheme } = useTheme();
    return <UsersContainer backgroundColor={theme.backgroundColor} fontColor={theme.fontColor}>
        {mockedData.map( u => <User></User>)}
    </UsersContainer>
}

const UsersContainer = styled.div<ThemeProps>`
    height: 60%;
    background-color: ${p => p.backgroundColor};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`
const User = styled.div`
    
    width: 70px;
    height: 90px;
    background-color: yellow;
    border-radius: 10px;
    margin-right: 34px;
    
`