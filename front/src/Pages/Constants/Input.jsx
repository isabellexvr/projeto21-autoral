import styled from "styled-components";

export default function Input({type, placeholder, name, handleForm, loading, theme}) {
    console.log(typeof handleForm)
    return <InputStyle type={type} placeholder={placeholder} name={name} onChange={handleForm} theme={theme}/>
}

const InputStyle = styled.input`
  all: unset;
  background-color: ${(p) => p.theme.fontColor};
  height: 52px;
  border-radius: 8px;
  width: 270px;
  padding: 10px;
  box-sizing: border-box;
  color: ${(p) => p.theme.backgroundColor};
  ::placeholder {
    color: ${(p) => p.theme.backgroundColor};
    opacity: 0.5;
  }
`;
