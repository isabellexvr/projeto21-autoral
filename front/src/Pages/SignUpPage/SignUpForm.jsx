import styled from "styled-components";
import Input from "../Constants/Input";
import { useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { colors } from "../../Services/Constants/colors";
import { uploadImage, convertBase64 } from "./helpers";

export default function SignUpForm({ theme, loading, setLoading }) {
  const [form, setForm] = useState({});
  const [url, setUrl] = useState(null);

  function handleForm({ target: { value, name } }) {
    setForm({ ...form, [name]: value });
    console.log(form);
  }

  console.log(form)

  return (
    <FormContainer>
      <Form>
        <Input
          type={"text"}
          placeholder={"Full Name"}
          name={"fullName"}
          handleForm={handleForm}
          loading={loading}
          theme={theme}
        />
        <Input
          type={"text"}
          placeholder={"Username"}
          name={"userName"}
          handleForm={handleForm}
          loading={loading}
          theme={theme}
        />
        <Input
          type={"email"}
          placeholder={"E-mail"}
          name={"email"}
          handleForm={handleForm}
          loading={loading}
          theme={theme}
        />

        <UploadButton>
          Upload a Profile Picture
          <input onChange={uploadImage} type="file" accept="image/*" />
          <AiFillCamera />
        </UploadButton>

        <Input
          type={"password"}
          placeholder={"Password"}
          name={"password"}
          handleForm={handleForm}
          loading={loading}
          theme={theme}
        />
        <Input
          type={"password"}
          placeholder={"Confirm Password"}
          name={"confirmPassword"}
          handleForm={handleForm}
          loading={loading}
          theme={theme}
        />
        <ConfirmButton>Sign Up!</ConfirmButton>
      </Form>
    </FormContainer>
  );
}

const FormContainer = styled.div``;

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 440px;

  justify-content: space-around;
`;

const UploadButton = styled.button`
  all: unset;
  width: 270px;
  height: 52px;
  cursor: pointer;
  box-sizing: border-box;
  border: 2px solid;
  border-color: ${colors.orange};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  filter: drop-shadow(0px 0px 2px ${colors.orange});
  font-weight: 500;
  font-size: 17px;
  position: relative;
  > input {
    all: unset;
    position: absolute;
    top: 0;
    left: 0;
    background-color: red;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
  }
  > svg {
    font-size: 25px;
  }
  :hover {
    background-color: ${colors.orange};
    transition: 500ms;
  }
`;

const ConfirmButton = styled.button`
  all: unset;
  width: 270px;
  height: 52px;
  cursor: pointer;
  box-sizing: border-box;
  background-color: ${colors.orange};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-weight: 500;
  font-size: 17px;
  filter: drop-shadow(0px 0px 2px ${colors.orange});
  border-radius: 8px;
  :hover {
    background-color: ${colors.pink};
    transition: 500ms;
  }
`;
