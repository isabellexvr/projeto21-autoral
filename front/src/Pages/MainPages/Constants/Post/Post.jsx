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
import api from "../../../Services/Api/api.js";
import { RiCloseCircleFill } from "react-icons/ri";
import styled from "styled-components";
import { colors } from "../../../Assets/colors";

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
  theme,
}) {
  const [menu, setMenu] = useState(false);

  const [editDescription, setEditDescription] = useState(false);

  const [loadingComments, setLoadingComments] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(null);

  function handlePostsOptions(action) {
    if (action === "Edit") {
      setMenu(false);
      setEditDescription(true);
    }
  }

  function handleComments(postId) {
    setShowComments(!showComments);
    setLoadingComments(true);
    setNewComment(null);
    api
      .get("/comments/find/" + postId, {
        headers: { Authorization: "Bearer " + userInfo.token },
      })
      .then((res) => {
        setComments(res.data);
        setLoadingComments(false);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function sendComment(e) {
    e.preventDefault();
    console.log(newComment);
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
            <OptionsMenu theme={theme} menu={menu}>
              <>
                <RiCloseCircleFill onClick={() => setMenu(!menu)} />
                {MENUOPTIONS.map((o, i) => (
                  <button onClick={() => handlePostsOptions(o)} key={i}>
                    {o}
                  </button>
                ))}
              </>
            </OptionsMenu>
            <OptionsButton onClick={() => setMenu(!menu)}>
              <SlOptions />
            </OptionsButton>
          </RightHeaderContainer>
        </HeaderContainer>
        <PostContent>
          {postMedia !== "null" && <PostMedia src={postMedia} />}
          {editDescription ? (
            <EditContainer>
              <EditDescriptionInput value={postDescription} />
              <div className="buttons">
                <button>Save</button>
                <button onClick={() => setEditDescription(false)}>
                  Cancel
                </button>
              </div>
            </EditContainer>
          ) : (
            <h1>
              <strong>-</strong> {postDescription}
            </h1>
          )}

          <ButtonContainer>
            {likes.find((l) => l.ownerId == userInfo.id) ? (
              <HiHeart
                color={"red"}
                onClick={() =>
                  services.handleDislike(postId, userInfo, setLikeLoading)
                }
              />
            ) : (
              <HiOutlineHeart
                onClick={() =>
                  services.handleLike(postId, userInfo, setLikeLoading)
                }
              />
            )}
            <AiOutlineComment
              onClick={() => {

                handleComments(postId);
              }}
            />
          </ButtonContainer>
          <InfoContainer>
            <p>{likesCount} Likes&nbsp;</p>
            <p>&nbsp;•&nbsp;</p>
            <p>&nbsp;{commentsCount} Comments</p>
          </InfoContainer>
        </PostContent>
        {showComments && (
          <>
            {loadingComments ? (
              <>carregando comentarios</>
            ) : comments.length > 0 ? (
              <CommentsContainer>
                <h1>Comments</h1>
                <NewCommentForm onSubmit={sendComment} theme={theme}>
                  <input
                    onChange={(e) => {
                      setNewComment(e.target.value);
                    }}
                    placeholder="Write a new comment..."
                  />
                  <button type="submit">Post</button>
                </NewCommentForm>
              </CommentsContainer>
            ) : (
              <CommentsContainer>
                <NewCommentForm onSubmit={sendComment} theme={theme}>
                  <input
                    onChange={(e) => {
                      setNewComment(e.target.value);
                    }}
                    placeholder="Write a new comment..."
                  />
                  <button type="submit">Post</button>
                </NewCommentForm>
              </CommentsContainer>
            )}
          </>
        )}
      </PostContainer>
    </>
  );
}

const EditContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  > .buttons {
    display: flex;
    justify-content: space-between;
    width: 125px;
    > button {
      all: unset;
      height: 25px;
      background-color: ${colors.orange};
      width: 60px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    > button:first-child {
      background-color: ${colors.pink};
    }
  }
`;

const EditDescriptionInput = styled.input`
  all: unset;
  background-color: white;
  width: 95%;
  height: 50px;
  border-radius: 10px;
  color: black;
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 8px;
`;

const CommentsContainer = styled.div`
  > h1 {
    color: ${colors.orange};
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  width: 90%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid grey;
`;

const NewCommentForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-top: 1px solid grey;
  padding-top: 10px;
  > input {
    all: unset;
    background-color: ${(p) => p.theme.fontColor};
    height: 30px;
    border-radius: 7px;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 5px;
    color: ${p => p.theme.backgroundColor};
    ::placeholder {
      font-size: 14px;
    }
  }
  > button {
    all: unset;
    background-color: ${colors.pink};
    width: 50px;
    height: 30px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
`;
