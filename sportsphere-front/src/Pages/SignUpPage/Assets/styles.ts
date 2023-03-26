import { ButtonProps } from "../../WelcomePage/Assets/propsTypes";
import styled from "styled-components";
import { colors } from "../../../assets/colors";
import IconButton from '@mui/material/IconButton';

export const Header = styled.div`
        font-family: Roboto;
        color: ${colors.orange};
        font-weight: 700;
        font-size: 35px;
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
        margin-top: 70px;
        filter: drop-shadow(1px 1px 12px ${colors.orange})
`

export const RegistrationForm = styled.form`
    font-family: Roboto;
    display: flex;
    flex-direction: column;
   align-items: center;

`

export const BottomContainer = styled.div`

    display: flex;
    flex-direction: column;
    height: fit-content;

`

export const SubmitButton = styled.button<ButtonProps>`
  all: unset;
  margin: 0 auto;
  cursor: pointer;
  margin-top: 20px;
  >button{
    all: unset;
    background-color: ${props => props.backgroundColor};
    height: 50px;
    width: 184px;
    border-radius: 25px;
    color: white;
    font-family: Roboto;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(1px 1px 12px ${props => props.backgroundColor});
    >h1{
      filter: drop-shadow(1px 0px 2.5px white)
    }
    :hover{
      background-color: ${colors.pink};
      transition: all 1s ease-out;
    }
  }

`

export const UploadImageContainer = styled.div`

    >button{
        z-index: 10;
            >input[type="file"]{
                all: unset;
                background-color: red;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        width: 100%;
        padding: 10px;
        cursor: pointer;

    }
    }
position: relative;
`;