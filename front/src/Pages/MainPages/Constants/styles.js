import styled from "styled-components";



export const Background = styled.div`
  background-color: ${(p) => p.theme.backgroundColor};
  height: 150vh;
  margin-top: 80px;
  color: ${(p) => p.theme.fontColor};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
