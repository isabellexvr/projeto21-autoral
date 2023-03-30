import { colors } from "../../../../Services/Constants/colors";
import styled from "styled-components";
import {SlOptions} from "react-icons/sl"

export default function Post() {
  return (
    <PostContainer>
      <HeaderContainer>
        <LeftHeaderContainer>
          <img src="https://res.cloudinary.com/dbxhasetw/image/upload/v1679935205/d1kvjwxkr1clyi2vdhld.jpg" />
          <TextInfo>
            <h1>iboselai da silva</h1>
            <h2>@iboselai</h2>
            <h3>5 mins ago</h3>
          </TextInfo>
        </LeftHeaderContainer>

        <OptionsButton>
            <SlOptions/>
        </OptionsButton>
      </HeaderContainer>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  width: 82%;
  height: 300px;
  margin-top: 20px;
  background-color: ${colors.lighterBlack};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderContainer = styled.div`
    margin-top: 10px;
  height: 60px;
  width: 90%;


  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TextInfo = styled.div`
  > h1 {
    cursor: pointer;
  }
  > h2 {
    margin-top: 5px;
    font-size: 13px;
    color: blue;
    cursor: pointer;
  }
  > h3 {
    font-size: 12px;
    margin-top: 5px;
    opacity: 0.5;
  }
`;

const OptionsButton = styled.button`
  all: unset;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  >svg{
    font-size: 16px;
  }
`;

const LeftHeaderContainer = styled.div`
  display: flex;
  > img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 2px solid ${colors.pink};
    margin-right: 10px;
    object-fit: cover;
  }
`;
