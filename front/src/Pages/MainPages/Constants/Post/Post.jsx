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
import CommentsModal from "../CommentsModal";
import api from "../../../Services/Api/api.js";

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
  commentsModalStates,
}) {
  const [menu, setMenu] = useState(false);
  const [comments, setComments] = useState([]);

  const { commentsModal, setCommentsModal } = commentsModalStates;

  function handleGetComments(postId) {
    api
      .get(`/comments/find/${postId}`, {
        headers: { Authorization: "Bearer " + userInfo.token },
      })
      .then((res) => {
        setComments(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

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
            <AiOutlineComment
              onClick={async() => {
                await handleGetComments(postId);
                setCommentsModal(true);
              }}
            />
          </ButtonContainer>
          <InfoContainer>
            <p>{likesCount} Likes&nbsp;</p>
            <p>&nbsp;•&nbsp;</p>
            <p>&nbsp;{commentsCount} Comments</p>
          </InfoContainer>
        </PostContent>
        <CommentsModal
          commentsModalStates={commentsModalStates}
          comments={comments}
          postId={postId}
          userInfo={userInfo}
        />
      </PostContainer>
    </>
  );
}
