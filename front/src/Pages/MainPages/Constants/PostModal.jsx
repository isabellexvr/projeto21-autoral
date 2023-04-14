import { ModalStyle, modalStyles } from "../TimelinePage/TimelineStyles";
import NewPostForm from "./NewPostForm";
import { useState } from "react";

export default function PostModal({
  isModalOpened,
  setIsModalOpened,
  theme,
  loading,
  setLoading,
  userInfo,
  communities
}) {
  ModalStyle.setAppElement(document.getElementById("root"));

  function handleCloseModal() {
    setIsModalOpened(false);
  }

  return (
    <ModalStyle
      shouldCloseOnOverlayClick={true}
      onRequestClose={handleCloseModal}
      style={modalStyles}
      isOpen={isModalOpened}
    >
      <NewPostForm
        userInfo={userInfo}
        theme={theme}
        setIsModalOpened={setIsModalOpened}
        loading={loading}
        setLoading={setLoading}
        communities={communities}
      />
    </ModalStyle>
  );
}
