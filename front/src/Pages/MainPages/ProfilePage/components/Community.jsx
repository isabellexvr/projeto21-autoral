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

export default function Community({ name, description, icon, category }) {
  return (
    <CommunityContainer>
      <CommunityHeader>
                <img src={icon} />
        <h1>{name}</h1>

      </CommunityHeader>
      <h3><strong>- </strong>{description}</h3>

    </CommunityContainer>
  );
}

const CommunityContainer = styled.div`
  width: 82%;
  height: fit-content;
  margin-top: 20px;
  background-color: ${colors.lighterBlack};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  >h3{
    >strong{
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
  >img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 15px; 
    box-sizing: border-box;
    border: 2px solid ${colors.orange};
  }
`;
