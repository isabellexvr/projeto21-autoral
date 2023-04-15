import { colors } from "../../../Assets/colors";
import styled from "styled-components";

export const PostContainer = styled.div`
  width: 82%;
  height: fit-content;
  margin-top: 20px;
  background-color: ${colors.lighterBlack};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderContainer = styled.div`
  margin-top: 13px;
  margin-bottom: 10px;
  height: 60px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TextInfo = styled.div`
  width: 75%;
  > h1 {
    cursor: pointer;
    line-height: 17px;
  }
  > h2 {
    margin-top: 3px;
    font-size: 13px;
    color: ${colors.pink};
    font-weight: 600;
    cursor: pointer;
  }
  > h3 {
    font-size: 12px;
    margin-top: 5px;
    opacity: 0.5;
  }
`;

export const OptionsButton = styled.button`
  cursor: pointer;
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

export const LeftHeaderContainer = styled.div`
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

export const RightHeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  height: 100%;
`;

export const PostContent = styled.div`
  height: fit-content;
  width: 90%;
  margin-bottom: 15px;

  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > h1 {
    > strong {
      color: ${colors.orange};
    }
    width: 95%;
    text-align: left;
    margin-top: 10px;
    font-size: 13px;
  }
`;

export const PostMedia = styled.img`
  height: 230px;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 90%;
  margin-top: 15px;
  > svg {
    font-size: 25px;
    margin-right: 36px;
    color: ${(p) => p.color};
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  width: 93%;
  font-size: 11px;
  margin-top: 6px;
`;

export const OptionsMenu = styled.div`
  height: 100px;
  width: 100px;
  position: absolute;
  background-color: red;

  right: 0;
  top: 0;
  border-radius: 15px;
  display: ${(p) => (p.menu ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  > button {
    all: unset;
    height: 30px;
    border: 2px solid ${colors.orange};
    width: 80%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
