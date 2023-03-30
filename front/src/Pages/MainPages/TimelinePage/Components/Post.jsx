import { colors } from "../../../../Services/Constants/colors";
import styled from "styled-components";
import { SlOptions } from "react-icons/sl";

export default function Post() {
  return (
    <PostContainer>
      <HeaderContainer>
        <LeftHeaderContainer>
          <img src="https://t4.ftcdn.net/jpg/03/36/26/53/360_F_336265345_U65QKmIeAmmpaPM2C1QaQKhDG7AxoMl9.jpg" />
          <TextInfo>
            <h1>Nome Completo do Usuário</h1>
            <h2>@username</h2>
            <h3>5 mins ago</h3>
          </TextInfo>
        </LeftHeaderContainer>
        <RightHeaderContainer>
          <OptionsButton>
            <SlOptions />
          </OptionsButton>
        </RightHeaderContainer>
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
  margin-top: 20px;
  height: 60px;
  width: 90%;


  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TextInfo = styled.div`
  width: 75%;
  > h1 {
    cursor: pointer;
    line-height: 17px;
  }
  > h2 {
    margin-top: 3px;
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
  > svg {
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

const RightHeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;

  height: 100%;
`;