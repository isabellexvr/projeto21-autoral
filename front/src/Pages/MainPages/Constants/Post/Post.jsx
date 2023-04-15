import { SlOptions } from "react-icons/sl";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { AiOutlineComment } from "react-icons/ai";
import {
  PostContainer,
  HeaderContainer,
  TextInfo,
  OptionsButton,
  LeftHeaderContainer,
  RightHeaderContainer,
  PostContent,
  PostMedia,
  ButtonContainer,
  InfoContainer,
  OptionsMenu,
} from "./PostStyles";
import { services } from "../services";
import { useState } from "react";

const MENUOPTIONS = ["Edit", "Delete"];

export default function Post({
  fullName,
  userName,
  userPicture,
  postMedia,
  postDescription,
  likesCount,
  commentsCount,
  time,
  postId,
  userInfo,
  likeLoading,
  setLikeLoading,
  likes,
}) {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <PostContainer>
        <HeaderContainer>
          <LeftHeaderContainer>
            <img src={userPicture} />
            <TextInfo>
              <h1>{fullName}</h1>
              <h2>@{userName}</h2>
              <h3>{services.getTimeAgo(time)}</h3>
            </TextInfo>
          </LeftHeaderContainer>
          <RightHeaderContainer>
            <OptionsMenu menu={menu}>
              {MENUOPTIONS.map((o, i) => (
                <button>{o}</button>
              ))}
            </OptionsMenu>
            <OptionsButton onClick={() => setMenu(!menu)}>
              <SlOptions />
            </OptionsButton>
          </RightHeaderContainer>
        </HeaderContainer>
        <PostContent>
          {postMedia !== "null" && <PostMedia src={postMedia} />}

          <h1>
            <strong>-</strong> {postDescription}
          </h1>
          <ButtonContainer>
            {likes.find((l) => l.ownerId == userInfo.id) ? (
              <HiHeart
                color={"red"}
                onClick={() => services.handleDislike(postId, userInfo)}
              />
            ) : (
              <HiOutlineHeart
                onClick={() => services.handleLike(postId, userInfo)}
              />
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
    </>
  );
}
