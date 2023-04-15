import styled from "styled-components";

export default function CommunityPage({
  publicationModal,
  setPublicationModal,
  loading,
  setLoading,
  commentsModalStates,
}) {
  const { commentsModal, setCommentsModal } = commentsModalStates;

  return <CommunityBackground>comunidade ne pae</CommunityBackground>;
}

const CommunityBackground = styled.div`
  background-color: ${(p) => p.theme.backgroundColor};
  z-index: 0;
  height: fit-content;
  padding-bottom: 120px;
  color: ${(p) => p.theme.fontColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
