import styled from "styled-components";



export const Background = styled.div`
  background-color: ${(p) => p.theme.backgroundColor};
  height: fit-content;
  margin-top: 80px;
  padding-bottom: 120px;
  color: ${(p) => p.theme.fontColor};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
