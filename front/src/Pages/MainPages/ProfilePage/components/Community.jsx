/* [
  {
      "id": 1,
      "name": "Valorant 082 ",
      "description": "Jogadores de Valorant de Alagoas.",
      "icon": "https://seeklogo.com/images/V/valorant-logo-FAB2CA0E55-seeklogo.com.png",
      "categoryId": 1,
      "adminId": 1,
      "createdAt": "2023-04-08T01:15:55.247Z"
  }
] */

import styled from "styled-components";
import { colors } from "../../../Assets/colors";
import { useNavigate } from "react-router-dom";

export default function Community({
  name,
  description,
  icon,
  cover,
  category,
}) {

  const navigate = useNavigate()
  return (
    <CommunityContainer onClick={()=>navigate(`/community/${name}`)} cover={cover}>
      <CommunityHeader>
        <img src={icon} />
        <h1>{name}</h1>
      </CommunityHeader>
      <h3>
        <strong>- </strong>
        {description}
      </h3>
    </CommunityContainer>
  );
}

const CommunityContainer = styled.div`
  width: 82%;
  height: 250px;
  margin-top: 20px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${(p) => p.cover});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  > h3 {
    width: 70%;
    text-align: center;
    opacity: 0.65;
    > strong {
      color: ${colors.pink};
    }
  }
`;

const CommunityHeader = styled.div`
  display: flex;
  padding: 15px;
  height: fit-content;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  > h1 {
    font-size: 18px;
    font-weight: 600;
  }
  > img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 15px;
    box-sizing: border-box;
    border: 2px solid ${colors.orange};
  }
`;
