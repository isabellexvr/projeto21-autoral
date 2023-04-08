import styled from "styled-components";
import {TiArrowDownThick} from "react-icons/ti"

export default function NoPostsYet({theme}) {
    return (
      <Background theme={theme}>
        <h1>There are no posts yet to see.</h1>
        <br/>
        <h1>Post your first publication clicking the orange button down below!</h1>
        <br/>
        <TiArrowDownThick/>
      </Background>
    );
  }
  
  const Background = styled.div`
    height: 220px;
    width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      >h1{
        color: ${p => p.theme.fontColor};
        opacity: 0.5;
        font-size: 22px;
        width: 80%;
        text-align: center;
        line-height: 23px;
      }
      >svg{
        font-size: 30px;
      }
  `;
  