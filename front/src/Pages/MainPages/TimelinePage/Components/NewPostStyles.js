import styled from "styled-components";
import { colors } from "../../../Assets/colors";

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-around;
  width: 87%;
  height: 60px;

  > .left-container {
    width: 80%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    > img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid ${colors.pink};
      margin-right: 13px;
    }
    > .username-select {
      > h2 {
        color: ${colors.pink};
        font-weight: 600;
        margin-top: 3px;
        margin-bottom: 5px;
        font-size: 13px;
      }
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      color: ${(p) => p.theme.fontColor};
      > select {
        cursor: pointer;
        color: ${(p) => p.theme.fontColor};
        font-weight: 600;
        background-color: ${colors.orange};
        border-radius: 5px;
        margin: 0;
        border: none;
        width: fit-content;
        height: 22px;
        font-family: inherit;
        font-size: 14px;
        line-height: inherit;
        outline: none;
        > option {
          all: unset;
        }
      }
    }
  }
  > .right-container {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    > .close-button {
      width: 55px;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      > svg {
        font-size: 25px;
        color: red;
        cursor: pointer;
      }
    }
  }
`;

export const ModalTitle = styled.div`
  color: ${colors.orange};
  border-bottom: 1px outset ${(p) => p.theme.fontColor};
  font-weight: 500;
  font-size: 18px;
  width: 100%;

  padding-bottom: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  > h1 {
    filter: drop-shadow(0px 0px 10px ${colors.pink});
  }
`;

export const NewPostContent = styled.div`
  height: fit-content;

  width: 87%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-radius: 10px;
  > .description {
    all: unset;
    background-color: ${(p) => p.theme.fontColor};
    height: 110px;
    width: 80%;
    box-sizing: border-box;
    padding: 15px;
    border-radius: 10px;
  }
  > .media {
    display: none;
  }
  > .upload {
    padding-left: 4px;
    height: 110px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    > h1 {
      font-size: 10px;
      color: ${(p) => p.theme.fontColor};
    }
    > label {
      box-sizing: border-box;
      opacity: 0.5;
      width: 45px;
      border: 2px outset ${(p) => p.theme.fontColor};
      height: 45px;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 10px;
      text-align: center;
      color: ${(p) => p.theme.fontColor};
      font-weight: 700;
    }
    > img {
      width: 45px;
      height: 45px;
      border-radius: 10px;
      object-fit: cover;
      box-sizing: border-box;
      border: 2px outset ${(p) => p.theme.fontColor};
    }
  }
`;

export const SubmitPostButton = styled.button`
  all: unset;
  width: 80px;
  height: 30px;
  background-color: ${colors.pink};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: ${(p) => p.theme.fontColor};
  border-radius: 10px;
`;

export const HandlingMedia = styled.button`
  all: unset;
  box-sizing: border-box;
  opacity: 0.5;
  width: 45px;
  background-color: ${(p) => p.theme.backgroundColor};
  border: 2px outset ${(p) => p.theme.fontColor};
  height: 45px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  text-align: center;
  color: ${(p) => p.theme.fontColor};
  font-weight: 700;
`;
