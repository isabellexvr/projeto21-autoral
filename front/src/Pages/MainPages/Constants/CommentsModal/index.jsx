import styled from "styled-components";
import Modal from "react-modal";
import { ModalStyle, modalStyles } from "../../TimelinePage/TimelineStyles";
import { useEffect, useState } from "react";
import api from "../../../Services/Api/api.js";
import { colors } from "../../../Assets/colors";

/* type PartNewComment = {
    postId: number;
    comment: string;
    createdAt?: Date;
} */

export default function CommentsModal({
  commentsModalStates,
  comments,
  postId,
  userInfo,
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
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <ModalStyle
      shouldCloseOnOverlayClick={true}
      onRequestClose={handleCloseModal}
      isOpen={commentsModal}
      style={modalStyles}
    >
      {comments?.map((c, i) => (
        <>gomentario</>
      ))}
      <NewCommentForm onSubmit={handlePostComment}>
        <CommentInput
          onChange={(e) => setComment(e.target.value)}
          placeholder="porra"
        />
        <button type="submit">Comment</button>
      </NewCommentForm>
    </ModalStyle>
  );
}

const NewCommentForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: red;
  justify-content: space-evenly;
  align-items: center;
  height: 100px;
  > button {
    all: unset;
    background-color: ${colors.orange};
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CommentInput = styled.input`
  all: unset;
  background-color: white;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  height: 50px;
`;
