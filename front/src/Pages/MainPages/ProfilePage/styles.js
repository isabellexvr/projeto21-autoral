import styled from "styled-components";
import { colors } from "../../Assets/colors";

export const ProfileBackground = styled.div`
  background-color: ${(p) => p.theme.backgroundColor};
  z-index: 0;
  height: fit-content;
  padding-bottom: 120px;
  color: ${(p) => p.theme.fontColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const ProfileHeader = styled.div`
  width: 85%;
  margin-top: 25px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > button {
    all: unset;
    width: 45px;
    height: 45px;
    background-color: ${colors.lighterBlack};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    > svg {
      color: grey;
      font-size: 22px;
    }
  }
`;

export const UsersCover = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  filter: brightness(80%);
  width: 100%;
  height: 300px;
  z-index: -1;
  object-fit: cover;
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 1)),
    to(rgba(0, 0, 0, 0))
  );
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
`;

export const UserMainInfoContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 25px;

  > h1 {
    font-size: 22px;
    font-weight: 600;
    color: ${colors.orange};
    padding: 5px;
  }
  > h2 {
    font-weight: 600;
    color: ${colors.pink};
    padding: 5px;
  }
  > h3 {
    color: ${(p) => p.theme.fontColor};
  }
`;

export const UserProfilePic = styled.img`
  width: 100px;
  border-radius: 50%;
  height: 100px;
  object-fit: cover;
  border: 5px double ${colors.pink};
`;

export const UserBiography = styled.h3`
  color: ${(p) => p.theme.fontColor};
  > strong {
    color: ${colors.orange};
  }
`;

export const UserStatisticsContainer = styled.div`
  width: 86%;

  height: 70px;
  border-radius: 15px;
  border: 1px solid grey;
  background-color: ${colors.lighterBlack};
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
`;

export const Statistic = styled.div`
  height: 100%;
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > h1 {
    font-size: 20px;
    color: ${(p) => p.theme.fontColor};
    margin-bottom: 5px;
  }
  > h4 {
    font-size: 14px;
    opacity: 0.7;
    color: ${(p) => p.theme.fontColor};
  }
`;

export const ViewButton = styled.button`
  all: unset;
  width: 50%;
  border: 4px solid ${colors.lighterBlack};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => (p.isSelected ? colors.orange : "none")};
  border-radius: 50px;
  font-size: 17px;
`;

export const ViewSelection = styled.div`
  width: 82%;
  height: 45px;
  background-color: ${colors.lighterBlack};
  border-radius: 50px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const FollowButton = styled.button`
all:unset;
background-color: ${colors.orange};
height: 35px;
width: 75px;
font-size: 18px;
font-weight: 600;
display: flex;
justify-content: center;
align-items: center;
border-radius: 6px;
margin-bottom: 10px;
`