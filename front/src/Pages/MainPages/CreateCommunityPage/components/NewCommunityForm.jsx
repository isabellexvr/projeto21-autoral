import styled from "styled-components";
import { colors } from "../../../Assets/colors";
import { useState, useEffect } from "react";
import { uploadImage } from "../../../Services/Api/uploadImage";
import api from "../../../Services/Api/api.js"

export default function NewCommunityForm() {
  const [form, setForm] = useState({});

  const [icon, setIcon] = useState(null);
  const [cover, setCover] = useState(null);

  const [iconLoading, setIconLoading] = useState(false);
  const [coverLoading, setCoverLoading] = useState(false);

  function handleForm({ target: { value, name } }) {
    setForm({ ...form, [name]: value });
  }

  useEffect(()=>{
    //api.get("")
  },[])

  return (
    <Background>
      <InputContainer>
        <label>Choose a name</label>
        <StyledInput type="text" name="name" />
      </InputContainer>
      <InputContainer>
        <label>Choose a description</label>
        <StyledInput type="text" name="name" />
      </InputContainer>

      <input
        onChange={(e) => uploadImage(setIconLoading, setIcon, e)}
        type="file"
        name="icon"
        id="icon"
        className="media-input"
      />
      <div className="upload">
        <label htmlFor="file">Upload An <strong>Icon</strong> Image</label>
      </div>
      <input
        onChange={(e) => uploadImage(setCoverLoading, setCover, e)}
        type="file"
        name="cover"
        id="cover"
        className="media-input"
      />
      <div className="upload">
        <label htmlFor="file">Upload An Cover Image</label>
      </div>
    </Background>
  );
}

const Background = styled.form`
  height: fit-content;
  width: 80%;
  border-radius: 15px;
  margin-top: 30px;
  background-color: ${colors.lighterBlack};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > .media-input {
    display: none;
  }
  > .upload {
    padding-left: 4px;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    > h1 {
      font-size: 10px;
      color: ${(p) => p.theme.fontColor};
    }
    > label {
        width: 100%;
      box-sizing: border-box;
      border: 2px solid ${colors.orange};
      height: 45px;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: ${(p) => p.theme.fontColor};
      font-weight: 700;
      margin-bottom: 13px;
      >strong{
        color: ${colors.pink};
      }
    }
    > img {
      width: 45px;
      height: 45px;
      border-radius: 10px;
      object-fit: cover;
      box-sizing: border-box;
      border: 2px outset ${(p) => p.theme.fontColor};
    }
  }
`;

const StyledInput = styled.input`
  all: unset;
  height: 45px;
  border: 2px solid ${colors.orange};
  border-radius: 10px;
  width: 80%;
  padding: 10px;
  box-sizing: border-box;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 13px;
  >label{
    margin-bottom: 5px;
    width: 75%;
  }
`;
