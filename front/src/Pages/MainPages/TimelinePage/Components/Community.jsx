import styled from "styled-components";
import { colors } from "../../../Assets/colors";
import { StyledLink } from "../../../Constants/styles";
export default function Community({
  communityCover,
  communityIcon,
  communityName,
  categoryName,
  theme
}) {
  return (
    <StyledLink to={`/community/${communityName}`} >
      <CommunityContainer communityCover={communityCover}>
        <Category theme={theme}>{categoryName}</Category>
        <Footer>
          <h1>{communityName}</h1>
        </Footer>
        <Icon src={communityIcon} />
      </CommunityContainer>
    </StyledLink>
  );
}

const CommunityContainer = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(p) => p.communityCover});
  background-size: cover;
  background-repeat: no-repeat;
  height: 155px;
  width: 120px;
  margin-right: 15px;
  border-radius: 15px;
  box-sizing: border-box;
  position: relative;
  border: 2px solid ${colors.lighterBlack};
`;

const Footer = styled.div`
  width: 102%;
  height: 46px;
  background-color: ${colors.lighterBlack};
  -webkit-mask-image: radial-gradient(
    circle at top,
    transparent 16px,
    black 17px
  );
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translate(-50%, -50%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  >h1{
    font-size: 14px;
  }
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  border: 2px solid ${colors.pink};
  filter: drop-shadow(1px 1px 12px ${colors.pink});
`;

const Category = styled.h2`
width: 85%;

top: 15px;
left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  padding-top: 6px;
  font-weight: 600;
  color: ${p => p.theme.fontColor};
  filter: drop-shadow(2px 2px 5px ${colors.orange});
`