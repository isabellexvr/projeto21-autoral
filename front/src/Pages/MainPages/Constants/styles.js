import styled from "styled-components";

export const Background = styled.div`
  background-color: ${(p) => p.theme.backgroundColor};
  height: 100vh;
  color: ${(p) => p.theme.fontColor};
`;
