import Input from "../Constants/Input";
import { useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import {
  FormContainer,
  Form,
  UploadButton,
  ConfirmButton,
  PicPreview,
  LinkToSignIn,
} from "./styles";
import { uploadImage } from "../../Services/Api/uploadImage.js";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import api from "../../Services/Api/api.js";

export default function SignUpForm({ theme, loading, setLoading }) {
  const [form, setForm] = useState({});
  const [url, setUrl] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const navigate = useNavigate();
  
  function handleForm({ target: { value, name } }) {
    setForm({ ...form, [name]: value });
  }

  function sendForm(event) {

    event.preventDefault();
    console.log({...form, picture: url})

     setLoading(true);

    if (form.password !== form.confirmPassword) {
      alert("As senhas não correspondem.");
      setLoading(false);
      return;
    }

    delete form.confirmPassword;

    let finalObj;
    url ? (finalObj = { ...form, picture: url }) : (finalObj = { ...form });

    api
      .post("/users/sign-up", finalObj)
      .then((res) => {
        console.log(res.data);
        alert("Successfully registered!");
        navigate("/sign-in");
        setLoading(false);
        event.target.reset();
      })
      .catch((err) => {
        console.log(err.response.data)
        alert("Something went wrong while registering.");
        setLoading(false);
        
      }); 

  }

  return (
    <FormContainer>
      <Form onSubmit={sendForm}>
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

        {uploadLoading ? (
          <UploadButton disabled>
            <ThreeDots
              height="50"
              width="50"
              radius="9"
              color={theme.fontColor}
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </UploadButton>
        ) : !url ? (
          <UploadButton>
            Upload a Profile Picture
            <input
              onChange={(e) => uploadImage(setUploadLoading, setUrl, e)}
              type="file"
              accept="image/*"
            />
            <AiFillCamera />
          </UploadButton>
        ) : (
          <UploadButton>
            Change Your Photo
            <PicPreview src={url} />
            <input
              onChange={(e) => uploadImage(setUploadLoading, setUrl, e)}
              type="file"
              accept="image/*"
            />
          </UploadButton>
        )}

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

        {loading ? (
          <ConfirmButton disabled>
            <ThreeDots
              height="50"
              width="50"
              radius="9"
              color={theme.fontColor}
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </ConfirmButton>
        ) : (
          <ConfirmButton type="submit">Sign Up!</ConfirmButton>
        )}
        <LinkToSignIn to="/sign-in">
          Do you already have an account? Sign in instead!
        </LinkToSignIn>
      </Form>
    </FormContainer>
  );
}
