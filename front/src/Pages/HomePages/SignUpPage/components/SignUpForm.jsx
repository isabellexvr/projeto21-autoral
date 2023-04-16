import Input from "../../Constants/Input";
import { useState } from "react";
import {
  FormContainer,
  Form,
  ConfirmButton,
  LinkToSignIn,
  UploadButton,
} from "../styles";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import UploadButtonComponent from "./UploadButton";
import axios from "axios";
import api from "../../../Services/Api/api.js";
import LocationForm from "./LocationForm";
import { BsFillGeoAltFill } from "react-icons/bs";

export default function SignUpForm({ theme, loading, setLoading }) {
  const [location, setLocation] = useState(null);
  const [showLocationForm, setShowLocationForm] = useState(false);

  const [form, setForm] = useState({});
  const [picture, setPicture] = useState(null);
  const [cover, setCover] = useState(null);

  const [profileUploadLoading, setProfileUploadLoading] = useState(false);
  const [coverUploadLoading, setCoverUploadLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const navigate = useNavigate();

  function handleForm({ target: { value, name } }) {
    setForm({ ...form, [name]: value });
  }

  async function sendForm(event) {
    event.preventDefault();

    setLoading(true);

    if (form.password !== form.confirmPassword) {
      alert("The passwords are different.");
      setLoading(false);
      return;
    }

    delete form.confirmPassword;

    let userInfo = { ...form };

    if (picture) userInfo = { ...userInfo, picture };
    if (cover) userInfo = { ...userInfo, cover };

    if (!selectedCountry || !selectedState || !selectedCity) {
      alert("Please, select your location first");
      return;
    }

    const locationInfo = {
      country: selectedCountry.label,
      countryIso2: selectedCountry.value,
      state: selectedState.label,
      stateIso2: selectedState.value,
      city: selectedCity.label,
    };

     await api
      .post("/users/sign-up", { userInfo, locationInfo })
      .then((res) => {
        console.log(res.data);
        alert("Successfully registered!");
        navigate("/sign-in");
        setLoading(false);
        event.target.reset();
      })
      .catch((err) => {
        console.log(err.response.data);
        alert("Something went wrong while registering.");
        setLoading(false);
      }); 
  }

  function getCurrentLocation() {}

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

        <UploadButtonComponent
          loading={profileUploadLoading}
          setLoading={setProfileUploadLoading}
          theme={theme}
          url={picture}
          setUrl={setPicture}
          afterText={"Upload a Profile Picture"}
          beforeText={"Change Your Profile Picture"}
        />

        <UploadButtonComponent
          loading={coverUploadLoading}
          setLoading={setCoverUploadLoading}
          theme={theme}
          url={cover}
          setUrl={setCover}
          afterText={"Upload a Cover Picture"}
          beforeText={"Change Your Cover Picture"}
        />

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
        <UploadButton
          type="button"
          onClick={() => setShowLocationForm(!showLocationForm)}
        >
          Select Your Location <BsFillGeoAltFill />{" "}
        </UploadButton>
        {showLocationForm && (
          <LocationForm
            selectedCountry={selectedCountry}
            selectedState={selectedState}
            selectedCity={selectedCity}
            setSelectedCountry={setSelectedCountry}
            setSelectedState={setSelectedState}
            setSelectedCity={setSelectedCity}
          />
        )}

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
