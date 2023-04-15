import styled from "styled-components";
import Modal from "react-modal";
import { useState } from "react";
import api from "../../../Services/Api/api.js";
import { colors } from "../../../Assets/colors";
import { RiCloseCircleFill } from "react-icons/ri";
import { SlOptions } from "react-icons/sl";

export default function CommentsModal({
  commentsModalStates,
  comments,
  postId,
  userInfo,
  theme,
}) {
  const { commentsModal, setCommentsModal } = commentsModalStates;
  const [comment, setComment] = useState(null);

  function handleCloseModal() {
    setCommentsModal(false);
  }

  function handlePostComment(e) {
    e.preventDefault();
    if (!comment) {
      alert("Write something for commenting.");
      return;
    }
    let finalObj = { postId, comment, createdAt: new Date().toISOString() };

    api
      .post("/comments/new", finalObj, {
        headers: { Authorization: "Bearer " + userInfo.token },
      })
      .then((res) => {
        setComment(null);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <CommentModal
      shouldCloseOnOverlayClick={true}
      onRequestClose={handleCloseModal}
      isOpen={commentsModal}
      style={{  overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(26, 25, 25, 0.25)",
        cursor: "pointer",
      },
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        cursor: "default",
      },}}
    >
      <Header theme={theme}>
        <h1>Comments</h1> <RiCloseCircleFill onClick={() => setCommentsModal(false)} />
      </Header>
      {comments?.map((c, i) => (
        <Comment>
          <CommentHeader theme={theme}>
            <img src={c.users.picture} />
            <div className="names">
              <h1>{c.users.fullName}</h1>
              <h2>@{c.users.userName}</h2>
            </div>
            <div className="options-button">
                <SlOptions />
            </div>
            
          </CommentHeader>
          <CommentContent theme={theme}>
            <strong>- </strong>
            {c.comment}
          </CommentContent>
        </Comment>
      ))}
      <NewCommentForm theme={theme} onSubmit={handlePostComment}>
        <CommentInput
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a new comment..."
        />
        <button type="submit">Post</button>
      </NewCommentForm>
    </CommentModal>
  );
}

const CommentModal = styled(Modal)`
  width: 85vw;
  height: fit-content;
  background-color: ${colors.lighterBlack};
  border-radius: 15px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const NewCommentForm = styled.form`
  display: flex;
  width: 90%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
  height: fit-content;
  > button {
    all: unset;
    background-color: ${colors.orange};
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    font-weight: 600;
    color: ${p => p.theme.fontColor};
    cursor: pointer;

  }
`;

const CommentInput = styled.input`
  all: unset;
  background-color: white;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Header = styled.h1`
  border-bottom: 1px solid grey;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: ${(p) => p.theme.fontColor};
  font-weight: 600;
  position: relative;
  > svg {
    cursor: pointer;
    position: absolute;
    right: 10px;
    color: red;
    font-size: 25px;
  }
`;

const Comment = styled.div`
  height: fit-content;
  width: 90%;
  margin-top: 15px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  > img {
    width: 42px;
    height: 42px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid ${colors.orange};
    box-sizing: border-box;
  }
  >.names{
    width: 70%;
    color: ${p => p.theme.fontColor};
    font-weight: 600;
    margin-left: 10px;
    >h1{
        font-size: 18px;
        margin-bottom: 3px;
    }
    >h2{
        font-size: 14px;
        color: ${colors.orange};
    }
  }
  >.options-button{
    cursor: pointer;
    width: 25px;
    height: 25px;
    object-fit: cover;
    border-radius: 50%;
    background-color: grey;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CommentContent = styled.div`
margin-left: 45px;
padding-bottom: 18px;
border-bottom: 1px solid white;
color: ${ p => p.theme.fontColor};
>strong{
    font-size: 20px;
    font-weight: 600;
    color: ${colors.pink};
}
`;
