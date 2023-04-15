import { ModalStyle, modalStyles } from "../TimelinePage/TimelineStyles";
import NewPostForm from "./NewPostForm";
import { useState } from "react";

export default function PostModal({
  publicationModal,
  setPublicationModal,
  theme,
  loading,
  setLoading,
  userInfo,
  communities
}) {
  ModalStyle.setAppElement(document.getElementById("root"));

  function handleCloseModal() {
    setPublicationModal(false);
  }

  return (
    <ModalStyle
      shouldCloseOnOverlayClick={true}
      onRequestClose={handleCloseModal}
      style={modalStyles}
      isOpen={publicationModal}
    >
      <NewPostForm
        userInfo={userInfo}
        theme={theme}
        setPublicationModal={setPublicationModal}
        loading={loading}
        setLoading={setLoading}
        communities={communities}
      />
    </ModalStyle>
  );
}
