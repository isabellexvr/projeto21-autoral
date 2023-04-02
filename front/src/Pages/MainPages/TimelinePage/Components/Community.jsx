import styled from "styled-components";
import { colors } from "../../../../Services/Constants/colors";

export default function Community({ communityCover, communityIcon }) {
  return (
    <CommunityContainer communityCover={communityCover}>
      <Footer>
        <h1>Soccer</h1>
      </Footer>
      <Icon src={communityIcon} />
    </CommunityContainer>
  );
}

const CommunityContainer = styled.div`
  background-image: url(${(p) => p.communityCover});
  background-size: cover;
  background-repeat: no-repeat;
  height: 158px;
  width: 120px;
  margin-right: 15px;
  border-radius: 15px;
  box-sizing: border-box;
  position: relative;
`;

const Footer = styled.div`
  width: 102%;
  height: 50px;
  background-color: ${colors.lighterBlack};
  -webkit-mask-image: radial-gradient(
    circle at top,
    transparent 16px,
    black 17px
  );
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  position: absolute;
  bottom: -26px;
  left: 50%;
  transform: translate(-50%, -50%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  border: 2px solid ${colors.pink};
  filter: drop-shadow(1px 1px 12px ${colors.pink});
`;
