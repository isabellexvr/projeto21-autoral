import { colors } from "../../../../Services/Constants/colors";
import styled from "styled-components";

export default function Post() {
    return (
        <PostContainer>
            <HeaderContainer>
                <img src="https://res.cloudinary.com/dbxhasetw/image/upload/v1679935205/d1kvjwxkr1clyi2vdhld.jpg"/>
            </HeaderContainer>
        </PostContainer>
    )
}

const PostContainer = styled.div`
  width: 82%;
  height: 400px;
  margin-top: 20px;
  background-color: ${colors.lighterBlack};
  border-radius: 15px;
`;

const HeaderContainer = styled.div`
    
    height: 40px;
    width: 100%;
    >img{
        width: 45px;
        height: 45px;
        border-radius: 50%;
    }
`