import { useState } from "react";
import Input from "../Constants/Input";
import { useNavigate } from "react-router-dom";
import api from "../../../Services/Api/api.js";
import { useUserInfo } from "../../../Contexts/UserInfoContext";
import { Form, ConfirmButton, LinkToSignUp } from "./styles.js";
/* {
  "id": 2,
  "fullName": "iboselai da silva",
  "userName": "ayaya",
  "picture": "https://res.cloudinary.com/dbxhasetw/image/upload/v1679893671/dpewyxrkvos7od1vtwwu.png",
  "email": "ayaya@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTg5NDE5MiwiZXhwIjoxNjc5OTA0OTkyfQ.d8M2K1zDTZwyUHA_CmwZQRoilrm6C5LjLASPmUQUoJI"
} */

export default function SignInForm({ theme, loading, setLoading }) {
  const [form, setForm] = useState({});
  const { setUserInfo } = useUserInfo();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("userInfo");
  if (isLoggedIn) {
    const userInfo = JSON.parse(isLoggedIn);
    setUserInfo(userInfo);
    navigate("/timeline");
  }

  function handleForm({ target: { value, name } }) {
    setForm({ ...form, [name]: value });
  }
  function sendForm(event) {
    event.preventDefault();

    setLoading(true);

    if (!form.email || !form.password) {
      alert("Please, fill all the fields before logginin.");
      return;
    }

    //pode ser email ou username :o
    api
      .post("/users/sign-in", form)
      .then((res) => {
        setUserInfo(res.data);

        const serialized = JSON.stringify(res.data);
        localStorage.setItem("userInfo", serialized);

        alert("Successfully logged in");
        setLoading(false);
        
        navigate("/timeline");
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong while logging in.");
        setLoading(false);
      });
  }

  return (
    <Form onSubmit={sendForm}>
      <Input
        type={"email"}
        placeholder={"E-mail"}
        name={"email"}
        handleForm={handleForm}
        loading={loading}
        theme={theme}
      />

      <Input
        type={"password"}
        placeholder={"Password"}
        name={"password"}
        handleForm={handleForm}
        loading={loading}
        theme={theme}
      />
      <ConfirmButton type="submit">Sign In!</ConfirmButton>
      <LinkToSignUp to="/sign-up">
        Don't have an account yet? Create a one!
      </LinkToSignUp>
    </Form>
  );
}
