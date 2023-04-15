import styled from "styled-components";
import { colors } from "../../../Assets/colors";

export const Background = styled.form`
  height: fit-content;
  padding-top: 20px;
  width: 80%;
  border-radius: 15px;
  margin-top: 30px;
  background-color: ${colors.lighterBlack};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > .media-input {
    display: none;
  }
  > .upload {
    padding-left: 4px;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    > h1 {
      font-size: 10px;
      color: ${(p) => p.theme.fontColor};
    }
    > label {
      width: 100%;
      box-sizing: border-box;
      border: 2px solid ${colors.orange};
      height: 45px;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: ${(p) => p.theme.fontColor};
      font-weight: 700;
      margin: 10px;
      position: relative;
      > strong {
        color: ${colors.pink};
      }
      >span{
        position: absolute;
        top: 2px;
        right: 10px;
        font-size: 10px;
      color: ${colors.pink};
      }
    }
  }
`;

export const StyledInput = styled.input`
  all: unset;
  height: 45px;
  border: 2px solid ${colors.orange};
  border-radius: 10px;
  width: 80%;
  padding: 10px;
  box-sizing: border-box;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  > label {
    margin-bottom: 5px;
    width: 75%;
    >span{
      font-size: 10px;
      color: ${colors.pink};
    }
  }
  ::placeholder{
    color: grey;
  }
`;

export const CategorySelect = styled.select`
  all: unset;
  border: 2px solid ${colors.orange};
  width: 80%;
  height: 45px;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  color: grey;
`;

export const CategoryOption = styled.option`
  all: unset;
  color: black;
  border-radius: 10px;
  background-color: ${colors.orange};
`;

export const SubmitButton = styled.button`
  all: unset;
  background-color: ${colors.orange};
  width: 60%;
  height: 40px;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  margin: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

export const PreviewPic = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;
