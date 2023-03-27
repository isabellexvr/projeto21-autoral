import styled from "styled-components";
import { useState } from "react";
import Input from "../Constants/Input";
import { colors } from "../../Services/Constants/colors";
import { Link } from "react-router-dom";
import api from "../../Services/Api/api.js"

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

  function handleForm({ target: { value, name } }) {
    setForm({ ...form, [name]: value });
  }
  function sendForm(event) {
    event.preventDefault();
    console.log(form)
    if(!form.email || !form.password){
      alert("Please, fill all the fields before logginin.")
      return
    }
    //pode ser email ou username :o
    api.post("/users/sign-in", form)
    .then( res => {
      console.log(res.data)
      alert('Successfully logged in')
      //navigate to timeline
    })
    .catch( err => {
      console.log(err)
      alert('deu ruim :(')
    })
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
        <LinkToSignUp to="/sign-up">Don't have an account yet? Create a one!</LinkToSignUp>
    </Form>
  )
}

const Form = styled.form`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 250px;

  justify-content: space-around;
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
  :disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const LinkToSignUp = styled(Link)`
  all: unset;
  width: 250px;
  cursor: pointer;
  line-height: 20px;
`;