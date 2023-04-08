import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

export default function LoadingPosts({theme}) {
  return (
    <Background>
            <ThreeDots
              height="100"
              width="100"
              radius="9"
              color={theme.fontColor}
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
    </Background>
  );
}

const Background = styled.div`
  height: 220px;
  width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
