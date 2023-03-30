import styled from "styled-components";
import { useTheme } from "../../../Contexts/ThemeContext";
import { Background } from "../Constants/styles";
import Header from "../Constants/Header";
import Footer from "../Constants/Footer";
import { colors } from "../../../Services/Constants/colors";
import Post from "./Components/Post";
import { useState } from "react";
import Modal from "react-modal";
import Community from "./Components/Community";

const postsMocked = [1, 2, 3, 4, 5];

const user = {};

const TIMELINESTYPES = ["My Timeline", "Communities"];

export default function TimelinePage() {
  const { theme, setTheme } = useTheme();
  const [selectedTimeline, setSelectedTimeline] = useState(0);
  console.log(theme);
  return (
    <>
      <Background theme={theme}>
        <Header theme={theme} />
        <FirstSectionTitle>Your Communities</FirstSectionTitle>
        <FirstSection>
          <CommunitiesContainer>
            {postsMocked.map((c) => (
              <Community communityCover={"https://yt3.googleusercontent.com/UhRgYwlAnZMwGH_SHPSSdaxP-7wc1eEPB9ye_5vJnWNna-RYvetlnxjOMGD3Lr6P2xPvLldDnA=s900-c-k-c0x00ffffff-no-rj"} communityIcon={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEX///8AAABNTE3Z2dlCQUJQT1Da2trIyMgfHx9FREXe3t7h4eHf39+5ubl5eXn39/fw8PDp6ek/Pj+np6ebm5spKSkZGRmPj4/R0dHm5uYTExO/v79tbW0uLi6vr69nZ2c5ODmKiopdXV0WFhY0NDSdnZ2qqqphYWGCgoIeHh4mJSZ7e3tqamodqq8OAAAUQElEQVR4nO1d63bivA4tBAJJoOFeLoUCpdNC5/2f70AASZbt+Eo731pHf2YNBds73pZkWVaenv4vMaUcDIvFcDj47XHElWHaH3+97bfLhiDL1tvzy2bV+0+jHXQmr9OGSZbZ1yb57aG6SzkfvxmxUVm/borfHrS9JJPMCR3I22b422M3S9n/64fuJtvJPz2VZX8fBO8qx5d/dVmuYsC7ymy3+G00kvS+osG7ymhT/jYmKv2m9exMp92l+WuVvP4rbC0nhtnY78arpBgKc1IOinl/vNuva3+6Xf0WKCKDGnpOn8dzI9fy1UuN+p39+QkQNaLH156YwaEMVy8tXUvjxw3fKKUG3+Fl7tPa6lmD8dfmUb3+9iGOyfylq+Tqr6zHvvp570Lb7b2cFM220hhjdpFc53rGeNrzV0XDzz9rH781+BqNSPs91Txu4jRtIx29zZ5G6kKpdJo/tPUoZfN1Av3wHKmTP+oH+BGp+VrpyPOWtWFSYzFpruFI6/FRD8kEnprtJrqlsXZ3pQZho9GP1INGhtyPPGZnfM0R/D9aT4d7i+t31uXfaH0ohNvA5eiCr9kG3J/RugKDsW5vWa+zx20ed6yrQ4XvjHB2/ySeDzm+N9ltt5s8YvcoprJNYLd5A0iWoY8/qhZUNede2hmzT1/R+iGyYM9xBPiauC2I53egqrnS5CD23o7WEQhT3yecQNJ7K2KH+CivnWSixpnGNhsb7QSeOwd7/xKxR4gow2pnejyP2NnT04vQ9nuTAmy24Q+diF3C3qx776zNvP2YvYlmfi3gazax45jMAd9pSboTd4/xdo3iZmbEADbBXq2j9XiWAXRI6SIqnFhWQ/C0l00OsA3WKpbbfRUwsiPa2YgOJpL9FQ6RuhzfudPobvdVIIR+ENRacxkbokDRqQzwAW73VUC7ncRORbMR/lQFgAcVwAe43ZWsYGFwzSbom9C1uKONSTqmos0D3O5K0IliPWaZEOMIMxoftKmWCiBxu2NvwLFj1mUrE1zxEGdY2C2pAT7E7b4KeBJ8cWStTPBv/MM3CW0m0wBEtzsiuEpghZx41y0R4szX4R/aAEQb3IwK74kw6J33nTGIW88eZqQNHUUf5HZXUkDvMnFa4lr0i2zsrQA+xu2+ChJIgbAlaFQfLUfPXbZtBquSM1m2ByRL/DgfWNotR5hVEKlddFdzNCx60WU3UOe2R9vD9HSUwt7H6ABxSzOtuuaT2MroOnJ9wAPy22k7G40O62n3ve4E/js+Qtx2n9aHUda8PWSYxFaLDMg1vuCe1fSAc5OU9/Hend6QXiexRQ+O3TSdIflAKQ84/dJ1texOp4ftmaYZ3Uy5pG5ID89GotvDJ9Uxooh0diJLcenQtDlnUiWxDaJzhtyrddM7L4CxLaJb+qbTAApzUxqJaRK9suQs2+YnIXoZXTKZSSBu9MsALaP9H7VtLLfNt91k00kWoDvJYKIZxbZ+BLViEyZWnk2u98+78aqTD5QmgdjdSCFMCnC5GHb6L892yYFbi8ZRRS8/vz/+rJLCuLpy0kWUZALqb7xj94v55uO5Xa/ozY4H2fXaq0aSV3DygiQKBdhVPN/BfDX5alOnlIixdVQz9tZFMF0uP1ML9VNONZ5S0ul/7P7yOTUlZZHIjJMXRroJdFBLGrhf1w0iT/M8L4o8nffHJIXJsE5w6t0SAmnEIygwXNLoRC3Ap2FylfSMdIG6qZ5EuKBcT1lWOK6Z40+plHRXu63/7iBBScl+tvYJo9533jMTw+8fGnYBeF6IRArk6VvNT8ZW39IIURC+sWG677ZwkFI6iSnOTk//E2zeI2WFDs8vy35AYwiZ+fs9Ook57mn1HMKogddJIA3t+GyHxfisxQ8WFGGaH83zgyrfzzMhp/0e2SACQKvfU1VznkR0qHXuMc6Bb0IO8R2dt8MLZ4BPpYAw6eEMaSiE4/Pd51Gv/U/HSYi1aTT2lv0lukmcKL+O/rO/46VLC3UTW4AMYZKjplJ+HROPA5wSnyAdF3tLlTKEqAhUJ8PIMOtHqJLwK3oOpyyFiDDFjZHKmKKpCDvpDAXoskQWIsKkQMdKYTAgfByY95Mox20tTpZ4yBCmqAdkXY7KOjRFRbMztRMbQ69HmBRgD2T3HxdpYHQ+UJ069TXgCHP0rKW1Bi6Ph88tyC4MoVMoq+QIif/N1zOuntCMCmho2XUQ7cDcENJNFPsukNTleEMl+KhabQc56AbmiDBF34gF0kA9hOaII0l1R/9KyXQDc0SYFOCciu53LxpJIX1AmeSnFUxwdDEXCoR4bV5kIzpbgQDx5JGnahkQrr1GICMkNBUmCyJVoVdA0eg4AaQ0dWGRjJDQlG4w0CcNPQIEo+NGUkpTl9MdBcIeaFOau4B730CAePQ4MoMSEQJNXbS5AmGODjbxXXb3z4K2FU90PTtOIc0AdKCpAmGKqoB4D0Dd0JvvYNakdELzJAJNHXSBAmFSwAYOLR/GAQPvvaH77kpSmvJvT1OFtaD7YNwkRluGGChxBkhpah1tVSIk9gK+CKsnNFMbjuYUlxbMkwgDs47TqRFiwAlWNBA3cGsYQlJK065th9Lu6boQYZMIpwvu9FALbs48ANJrDbbX0tQI0XG7h3xQ0QRufsEv8SGpD02lPf5V1YBFvB+5w648sCACPikp49UO4cl1IGqEJFpzmzIgV+ARPB6vegGkNLWM2PJY2w0hbvRv7QBt1bFwa4EFfvQiaZNc3bAcSU+JMClgudwCw2CIwtzuUJJSmh7sulQDTHrP7EnBXbCwbB/0eD0BUpraOVcahHhYel13uHUKAohWdeZLUkJTK8usNPiCMr2e0sHJpLWhVXeHJPVGiDS1ynLUIeR+G+jWsDRmzDXynkFypdhqxagNvmAuxKGFGYsYJHWkqdpYXJSp+KDAHAYZCySp8qKppeAtKpvrE7kWIexTKz90FwVhFJJSmlqctOsApgswiNXuAs9+Q5LtP++NSFfp3AQGYw43aFVpgh5uXxjb+fH7p6JHIemZphCsM6djaBRN0SeJRxUvhZRqX7cG9bN0k85NHGiqVDRpIZS4qGgpFn/zPLeA3Gl+tdxZYCTGPFWVosnnYg3NCmFDlKmX7xaJpPRquJGmqgnkdd52CoRed/gxlhVIUlrbw7Afl5dhnkul+l6VCD1MP7QcTFJCU8OTlpZhryPX7P1UI2x0Xev3wC957RqPSZwJo9MLW4ZpoboK09YgdI26xSOpA00ZQ9NPFY6mFmFj7xKVguOeCCQl52y1WQviMixWyuK1NXPYcDogARMbTtLzJMKOvDYtpBAY+qLGcD1qgv9lrCyqtROHmxW3g18NQrusBcrQhF2KmkIToqbJeIXCzNKJw6PzCFNoSVNCUsFNu8gWS0qI1qIlV++zy9+Br8cgKT1nqzFbQNKUl/Q/tlotQFhZfJi4C8XajKnGI+fh6gWfeQySClkLnx8djcZDN02sjdVYZ7SgRLXSQMtWxylt/gN91GvQmYjZpHFISml6kdnf8VxaLoO7ihk3xCGMMqGehIjw6lK2myy5UOUBl/PJm5yDuNSVeHET/pAvMn3+Ixwb9W5uGrvQ3r3WIchgD1btnuBm3X0V8QKFbwzc+K/2kqN/mI0A1LY++t7cnK1S7aYdMo6w8vzAlICeaLMq/rN7QfTkz7Oq0DaRbjA+ruykh/jVL54GeZ6mBUsqvzK0QghtVEYdwqf0TOwo/nj8lG++FeRRiLaUjR1Au4vk2fNHJ2Ep5ac7vjNC+FBESMOAvCKqgwSZDLXvZSNbBEgKglSbXciXFFShkS16mUmlFW0nUPuOC3OfLSpIhKtFg/+y/gxLjgqrSK0sXWcGyPSGQ3WOdVaHEGO5bOtjtyYOlYJjVTpcs9qaCiv1cdaYf56ZQlDKcisCbPEygMB9nkHRbvJq4aJsiZFipb6dTSM3grP7JvzyCrf62ey2mKBLc3P71GU0r/3q2p698pfkDNmMO5pG1hHzSMvORLnBrUadSQhhYm5h5d39/4pkNAVTj28fshcltHN7tA4TyNWaMkQz5F5iJSMJICkftWIEU/iVotVY7iedmh0Vf22CrWnkj3FUE9AcrphdHskAmbGgG1hF57D815OVMZJaspIklqaRGUFDbmJeJKsP9Een8hzKW2h86HLv8De7rSKLd1mYRskIGqIni6rEwAIqEC3lZQhrGk6SgSSSqrGPz8ITZivKZBq5ETRFwG4HTuT6j0RT9LuBDTDlkqqxDl4SYRuaaS0+bgSNUczb3p5cNZRoil4pKCwI9suqRv6yWexNo7QTNKYOwpkhZgJLNFWkVuGxt96rcQmfWptGZgQtbo/CvdgamqqubuBYGEJgtGOK+04cutI0SkbQouwLpurpaYrLkKwsmHGeNunSuyBm08iN4MHmVI9GubU0hSbJotalvjrlDYhSMvdDMo3MCFqdzNI4t5amOGjyrja82CVYRJdDdVnqTKNkBK1O14WjCkpTtTUUQubgqoqPGr7rVRkpZzsfNI2uRvAm4mmThqaZOp6sPuEMIOlVuGm8Nq7YCVoJu31PikRQmqKtEAycMpUCSeqd8aYyjdwIdmsK5lDhp9oamiI9RGLAx5Sm8KH/ZSFuGg9tHhyxPVJX3PkFP5/QFEnKdAfsLwlNg0layY7NmM1OUCVybomSpkgQpjuQTqBNMYvOrQwAl7oL+nU7QVEU6UGEpmuFJmXTguEoDCLBR4FXabhpRLG/pabM8EKavsvRbmlaMAzSjkrSSjQFQ+3P0dVJegqa4qClaUFtuuUk3YYClE3jRVxyIVIlQpILfKMpKdMuTwv86Z4+qX8aPiLVdXZptVACpHe47jSF5hX7WTwrvppE15sBJhFN49ElJ0mb7UxqtFU0Ja+EULiBeGuv2ukjSWMVBx4QSx9UhaaGptiDqiHc/Iskjff6GFB9TvnWuoz8iqYw6NmFphhVUvaAd14ufg0+8Hgv4YXUKZcSLbpcZwVNyZZaPWicYo8rSDYC/r1D0KcWIKMpmgpNSAIzp86TWD/ffuKBsB6gSFPyMi+NpSUV89yvAtqIO0ITQFqijUzh1jiCxgHcu5hv/HNGaARIaXrAKdSuc6H6ZHySOiM0AzzTFCwEqpmaMr+KF0rEfB+eI8I6M6GiKUhNzIW/ETfyayndEFoBFEokm6dQ8dKMqG/lcEKo92QYTaUz3NrWpZUY9ZW0Lgh1zraZpoa699/it8OulXJxQKi9eGemqcFhYu9+iPvqGGuENkpUR1NjyEXcjsd9b7ItQjsdAzTdCUNO69t+IrWsopPUFqF2O6gWkaYWwUn6/dDaZkysEJbqiEWNFPSMwCamRPIpAqu5cLFBaGskKEKSym61mSXV4yO/hd4CoabSRZ0Q19R2q0eSw+O8FfouRoRuKuY+hYR0tppx6/4TKzEgLD0m8AyQWHxrvUHc02XMN+LVI/RYgWfJSQzPQfWTu6Yxl2IdwoGzCq2ELkKnfRA5aYjo1ugR+hH0UrmMhCidlAZ13iK9hqsOoaONRynIjtaRbZ1HQNQg9MaXFDsyTFeNQfcknSKOvlEhLP3xJcKlJ/daCcTKHOdJHuPVhjLC0nobqJCcvhPDIzJfkuPobZ4maXjsmyMc2O8CVQDpSvIqvEpfZZnlF2UeSlYBYQg9K4DUTnhuguh5WLt3tVfDEJAYQFiVQdNXAaQ3JXz5Re+GfRY3k5x7g0wI7/dJGMQ8oUkr/kXIaZmJfQ+8jnTho3fE6MFyU/h5MbcZpAA9CnmA0Nz7do8Oqec6ldKNkOfcexrzOc0bCwvL0wytLOVvrlmo30uqEJ7gfpHuytNWCFo0+E0ANFF5q1o8+WJYi7MsB8Oh5hVCX15M7QnvhvJ6gZowQEr4946WWGleLIbDwVnKs1z+HQ4XRfX1lN/2JM+s4+5yi1V2Ql848iRa/vOididW0am7yDhxnEZWAiO0xHolg2PYiFhC1ImtyPbcReGk4v30KADZiyUbrz0XiHnOXiB+yFp8Ssf2D41VUHB4+ZUBonCBbeTw0PmN+eUlsSfjp0Wftua/ENOOgpUMEbGOg62xlmo6wIVylua27Nu0mArbwXAzIYrIteeezUNPe+xMGW97Zvwy/LfZ/OdzsQpNvEymq4iPb90x69R8LsJYCrc9RyybfWow/xIf4gVX7sJqve0Kw0MvNuIP+H3kjJce29UxNU+Y1xf5wKESls28XtWNKO2xs9a1fBFyxK8qas2/ZHLWMUIOsgzZ4vlOtdPIyxcq7yPTpOyrqI1tWszZ7dsIjoxGeDbKh4aqnKFHBbwK4pZN415hifKUlUmKfJoiCi+8OFJRlRXYVDEUMZrMf1588LIHoS/dqpeCE2vf4RhpCdhKeE0HNo2sQcH858VG+vtD8V2EU6bxJmLktcVmNfCuwu7p4e4/L/pStROvO2aOIichfa5gPaYLlt6iuC4vTSM3/9Xu/7wd27BCc2c6xEvnrRWpSmgj2xRVvDHnW8FahqIw839aFb30Q67V+UgVI0oi1/lqfeRFXqxEh/NdVdJBOY2S+d/JYY/9Y4ygRlRhidcV+9SCoQBxVF8o5uKd/yS+swzeDCNSlVVxmkZR4mZn2UlSX/tractQnEZ9Zaq/P0pQlFVN7Z+T0wReAGYtXX2xtjmT62HS15ZxWm8vY7ZGNzrw+A3ie6wPY8aoD6QtT4cLzFqcl79u1zVV2n4b30U6tVXWlrPpelsBlWS03U5P77Vl4V5/kZ9U9BFfAeqx2+2eztLtHo8zm3p3X7+kX1SiC9sHyOin7Z9R5oqrDP6yi3kLIpqU48w8dBt5DX2j7QNlsLFZkrXy/Q/Du0rZ+ZL9ckvJJv+AbbCSYf/Zuf5pe6Ir+/yvStmZ/LWst7rd9R8R/vwRKRf98etea/vaby+bzg9t2x8sZTqfr8aTyUslk/FqPk/+IXP+35b/Abh9Ydjwb8kKAAAAAElFTkSuQmCC"} />
            ))}
          </CommunitiesContainer>
        </FirstSection>
        <TimelineSelection>
          {TIMELINESTYPES.map((t, i) => (
            <TimelineButton
              isSelected={selectedTimeline === i}
              onClick={() => setSelectedTimeline(i)}
            >
              {t}
            </TimelineButton>
          ))}
        </TimelineSelection>
        {postsMocked.map((p) => (
          <Post></Post>
        ))}
        <Footer theme={theme} />
      </Background>
    </>
  );
}

const TimelineButton = styled.button`
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

const TimelineSelection = styled.div`
  width: 82%;
  height: 45px;
  background-color: ${colors.lighterBlack};
  border-radius: 50px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const FirstSectionTitle = styled.h1`
  font-size: 19px;
  margin-bottom: 10px;
  width: 82%;
`;

const FirstSection = styled.section`
  height: fit-content;
  width: 82%;
  overflow-x: scroll;
  > h1:first-child {
  }
`;

const CommunitiesContainer = styled.div`
  display: flex;
  width: fit-content;
`;
