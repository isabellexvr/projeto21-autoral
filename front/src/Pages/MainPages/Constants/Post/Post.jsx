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
    setShowComments(true);
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

  function sendComment(e, postId) {
    e.preventDefault();
    setLoadingComments(true);
    const finalObj = {
      comment: newComment,
      postId,
      createdAt: new Date().toISOString(),
    };
    console.log(finalObj);
    api
      .post("/comments/new", finalObj, {
        headers: { Authorization: "Bearer " + userInfo.token },
      })
      .then((res) => {
        handleComments(postId);
        setLoadingComments(false);
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
                showComments ? setShowComments(false) : handleComments(postId);
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
              <>Loading...</>
            ) : comments.length > 0 ? (
              <CommentsContainer>
                <h1>Comments</h1>
                {comments.map((c, i) => (
                  <StyledComment>
                    <div className="header">
                      <div className="left">
                        <img src={c.users.picture} />
                        <div className="names">
                          <h1>{c.users.fullName}</h1>
                          <h2>@{c.users.userName}</h2>
                        </div>
                      </div>

                      <button>
                        <SlOptions />
                      </button>
                    </div>
                    <div className="content">
                      <p>{c.comment}</p>
                    </div>
                  </StyledComment>
                ))}
                <NewCommentForm
                  onSubmit={(e) => sendComment(e, postId)}
                  theme={theme}
                >
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
                <NewCommentForm
                  onSubmit={(e) => sendComment(e, postId)}
                  theme={theme}
                >
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
    font-size: 21px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 10px;
    filter: drop-shadow(1px 1px 12px ${colors.orange});
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
  margin-top: 10px;
  > input {
    all: unset;
    background-color: ${(p) => p.theme.fontColor};
    height: 30px;
    border-radius: 7px;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 5px;
    color: ${(p) => p.theme.backgroundColor};
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

const StyledComment = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  margin-top: 15px;
  border-bottom: 1px solid ${colors.pink};

  > .header {
    display: flex;
    justify-content: space-between;
    width: 90%;
    > .left {
      display: flex;
      width: 70%;
      > img {
        width: 40px;
        height: 40px;
        border: 2px solid ${colors.orange};
        border-radius: 50%;
        object-fit: cover;
        margin-right: 6px;
      }
      > .names {
        > h1 {
          font-size: 15px;
        }
        > h2 {
          color: ${colors.orange};
          font-size: 13px;
          font-weight: 600;
        }
      }
    }
    > button {
      all: unset;
      width: 30px;
      height: 30px;
      background-color: grey;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
      > svg {
        font-size: 17px;
      }
    }
  }
  > .content {
    margin-top: 7px;
    margin-bottom: 10px;
    width: 90%;
  }
`;
