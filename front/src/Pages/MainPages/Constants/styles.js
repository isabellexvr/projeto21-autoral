import styled from "styled-components";



export const Background = styled.div`
  background-color: ${(p) => p.theme.backgroundColor};
  height: fit-content;
  margin-top: 80px;
  color: ${(p) => p.theme.fontColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: -moz-scrollbars-horizontal;
overflow-y: hidden;
overflow-x: auto;
`;
