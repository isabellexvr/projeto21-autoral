import { colors } from "../../Assets/colors";
import styled from "styled-components";
import Modal from "react-modal"
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";

export const ModalStyle = styled(Modal)`
  width: 85vw;
  height: 300px;
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

export const TimelineButton = styled.button`
  all: unset;
  width: 50%;
  border: 4px solid ${colors.lighterBlack};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => (p.isSelected ? colors.orange : "none")};
  border-radius: 50px;
  font-size: 17px;
`;

export const TimelineSelection = styled.div`
  width: 82%;
  height: 45px;
  background-color: ${colors.lighterBlack};
  border-radius: 50px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const FirstSectionTitle = styled.h1`
  font-size: 19px;
  margin-bottom: 10px;
  width: 82%;
`;

export const FirstSection = styled.section`
  height: fit-content;
  width: 82%;
  overflow-x: scroll;
  scroll-snap-align: start;
`;

export const CommunitiesContainer = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  scroll-snap-align: center;
`;

export const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(26, 25, 25, 0.75)",
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
  },
};

export const NewCommunity = styled(Link)`
  all: unset;
  border: 2px solid ${colors.lighterBlack};
  height: 155px;
  width: 120px;
  margin-right: 15px;
  border-radius: 15px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  > h1 {
    text-align: center;
    line-height: 18px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 15px;
  }
`;

export const NewCommunityFooter = styled.div`
  width: 102%;
  height: 46px;
  background-color: ${colors.lighterBlack};
  -webkit-mask-image: radial-gradient(
    circle at top,
    transparent 16px,
    black 17px
  );
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  position: absolute;
  bottom: -23px;
  left: 50%;
  transform: translate(-50%, -50%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > h1 {
    font-size: 14px;
  }
`;

export const NewCommunityIcon = styled(BsPlusLg)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  border: 2px solid ${colors.pink};
  filter: drop-shadow(1px 1px 12px ${colors.pink});
  background-color: ${colors.orange};
  font-size: 5px;
`;
