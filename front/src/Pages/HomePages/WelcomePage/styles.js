import styled from "styled-components";
import { colors } from "../../../Services/Constants/colors";

export const WelcomeMessage = styled.div`
position: relative;
display: flex;
flex-direction: column;
padding-top: 250px;
align-items: center;
text-align: center;
    >h1{
        width: 290px;
        font-size: 34px;
        font-weight: 600;
        filter: drop-shadow(0px 0px 2px ${p => p.theme.fontColor});
        >strong{
            color: ${colors.orange};
        }
    }
    >p{
        margin-top: 20px;
        width: 260px;
        font-size: 14px;
        opacity: 0.5;
    }
`;

export const StartButton = styled.button`
 all: unset;
    width: 150px;
    background-color: ${colors.pink};
    border-radius: 15px;
    height: 40px;
    margin-top: 150px;
    font-weight: 500;
    filter: drop-shadow(0px 0px 4px ${colors.pink})
`;

export const Logo = styled.img`
width: 280px;
opacity: 0.33;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;