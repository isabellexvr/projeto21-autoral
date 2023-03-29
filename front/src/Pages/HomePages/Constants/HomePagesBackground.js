import styled from "styled-components";
import { colors } from "../../../Services/Constants/colors";

export const Background = styled.div`
  background-color: ${(p) => p.theme.backgroundColor};
  height: 100vh;
  color: ${(p) => p.theme.fontColor};
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: ${colors.pink};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px ${colors.pink};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

export const TopContainer = styled.div`
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SwitchThemesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 115px;
  position: absolute;
  right: 20px;
  top: 15px;
  z-index: 2;
  > svg {
    font-size: 20px;
  }
`;
