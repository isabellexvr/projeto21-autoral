import styled from "styled-components";



export const Background = styled.div`
margin-top: 80px;
  background-color: ${(p) => p.theme.backgroundColor};
  height: 150vh;
  color: ${(p) => p.theme.fontColor};
  display: flex;
  flex-direction: column;
`;
