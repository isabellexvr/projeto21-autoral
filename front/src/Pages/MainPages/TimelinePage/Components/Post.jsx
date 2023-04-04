import { colors } from "../../../Assets/colors";
import styled from "styled-components";
import { SlOptions } from "react-icons/sl";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { AiOutlineComment } from "react-icons/ai";
import { useState } from "react";

export default function Post({
  fullName,
  userName,
  userPicture,
  postMedia,
  postDescription,
  likesCount,
  commentsCount
}) {
  const [liked, setLiked] = useState(false);

  return (
    <PostContainer>
      <HeaderContainer>
        <LeftHeaderContainer>
          <img src={userPicture} />
          <TextInfo>
            <h1>{fullName}</h1>
            <h2>@{userName}</h2>
            <h3>5 mins ago</h3>
          </TextInfo>
        </LeftHeaderContainer>
        <RightHeaderContainer>
          <OptionsButton>
            <SlOptions />
          </OptionsButton>
        </RightHeaderContainer>
      </HeaderContainer>
      <PostContent>
        <PostMedia src={postMedia} />
        <h1>- {postDescription}</h1>
        <ButtonContainer>
          {liked ? (
            <HiHeart color={"red"} onClick={() => setLiked(false)} />
          ) : (
            <HiOutlineHeart  onClick={() => setLiked(true)} />
          )}
          <AiOutlineComment />
        </ButtonContainer>
        <InfoContainer>
            <p>{likesCount} Likes&nbsp;</p>
            <p>&nbsp;•&nbsp;</p>
            <p>&nbsp;{commentsCount} Comments</p>
        </InfoContainer>
      </PostContent>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  width: 82%;
  height: 300px;
  margin-top: 20px;
  background-color: ${colors.lighterBlack};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const HeaderContainer = styled.div`
  margin-top: 13px;
  height: 60px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TextInfo = styled.div`
  width: 75%;
  > h1 {
    cursor: pointer;
    line-height: 17px;
  }
  > h2 {
    margin-top: 3px;
    font-size: 13px;
    color: ${colors.pink};
    font-weight: 600;
    cursor: pointer;
  }
  > h3 {
    font-size: 12px;
    margin-top: 5px;
    opacity: 0.5;
  }
`;

const OptionsButton = styled.button`
  all: unset;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  > svg {
    font-size: 16px;
  }
`;

const LeftHeaderContainer = styled.div`
  display: flex;

  > img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 2px solid ${colors.pink};
    margin-right: 10px;
    object-fit: cover;
  }
`;

const RightHeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;

  height: 100%;
`;

const PostContent = styled.div`
  height: 205px;
  width: 90%;
  margin-bottom: 15px;

  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > h1 {
    width: 95%;
    text-align: left;
    margin-top: 10px;
    font-size: 13px;
  }
`;

const PostMedia = styled.img`
  height: 130px;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 95%;
  margin-top: 10px;
  > svg {
    font-size: 25px;
    margin-right: 10px;
    color: ${p => p.color};
  }
`;

const InfoContainer = styled.div`
  display: flex;
  width: 93%;
  font-size: 11px;
  margin-top: 6px;
`