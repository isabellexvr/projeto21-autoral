import { useState, useEffect } from "react";
import { uploadImage } from "../../../Services/Api/uploadImage";
import api from "../../../Services/Api/api.js";
import { ThreeDots } from "react-loader-spinner";
import {
  Background,
  StyledInput,
  InputContainer,
  CategorySelect,
  CategoryOption,
  SubmitButton,
  PreviewPic,
} from "./NewCommunityFormStyles";
import styled from "styled-components";
import { colors } from "../../../Assets/colors";
import { BsFillGeoAltFill } from "react-icons/bs";
import LocationForm from "../../../HomePages/SignUpPage/components/LocationForm";

export default function NewCommunityForm({
  token,
  theme,
  navigate,
  showLocationForm,
  setShowLocationForm,
}) {
  const [form, setForm] = useState({});
  const [categories, setCategories] = useState([]);

  const [icon, setIcon] = useState(null);
  const [cover, setCover] = useState(null);
  const [category, setCategory] = useState(null);

  const [iconLoading, setIconLoading] = useState(false);
  const [coverLoading, setCoverLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  function handleForm({ target: { value, name } }) {
    setForm({ ...form, [name]: value });
  }

  function sendForm(e) {
    e.preventDefault();
    let communityInfo;

    if (!category) {
      alert("Please, choose an category");
      return;
    }

    communityInfo = {
      ...form,
      categoryId: Number(category),
      createdAt: new Date().toISOString(),
      icon,
      cover,
    };

    if (!selectedCountry || !selectedState || !selectedCity) {
      alert("Please, select the location first");
      return;
    }

    const locationInfo = {
      country: selectedCountry.label,
      countryIso2: selectedCountry.value,
      state: selectedState.label,
      stateIso2: selectedState.value,
      city: selectedCity.label,
    };

    api
      .post(
        "/communities/create",
        { communityInfo, locationInfo },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        alert("Community created");
        navigate("/timeline");
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    api
      .get("/categories/find-all")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Background onSubmit={sendForm}>
      <InputContainer>
        <label>Choose a Category</label>
        <CategorySelect
          required
          defaultValue={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <CategoryOption>Select an Category...</CategoryOption>
          {categories?.map((c, i) => (
            <CategoryOption value={c.id} key={i}>
              {c.name}
            </CategoryOption>
          ))}
        </CategorySelect>
      </InputContainer>

      <InputContainer>
        <label>Choose a name</label>
        <StyledInput
          required
          placeholder="Name it..."
          onChange={handleForm}
          type="text"
          name="name"
        />
      </InputContainer>
      <InputContainer>
        <label>
          Choose a description <span>*Optional*</span>
        </label>
        <StyledInput
          placeholder="Description..."
          onChange={handleForm}
          type="text"
          name="description"
        />
      </InputContainer>

      {iconLoading ? (
        <div className="upload">
          <label htmlFor="icon">
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
          </label>
        </div>
      ) : !icon ? (
        <>
          <input
            onChange={(e) => uploadImage(setIconLoading, setIcon, e)}
            type="file"
            name="icon"
            id="icon"
            className="media-input"
          />
          <div className="upload">
            <label htmlFor="icon">
              Upload An Icon Image <span>*Optional*</span>
            </label>
          </div>
        </>
      ) : (
        <>
          <input
            onChange={(e) => uploadImage(setIconLoading, setIcon, e)}
            type="file"
            name="icon"
            id="icon"
            className="media-input"
          />
          <div className="upload">
            <label htmlFor="icon">
              <PreviewPic src={icon} /> Change Icon
            </label>
          </div>
        </>
      )}

      {coverLoading ? (
        <div className="upload">
          <label htmlFor="cover">
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
          </label>
        </div>
      ) : !cover ? (
        <>
          <input
            onChange={(e) => uploadImage(setCoverLoading, setCover, e)}
            type="file"
            name="cover"
            id="cover"
            className="media-input"
          />
          <div className="upload">
            <label htmlFor="cover">
              Upload An Cover Image <span>*Optional*</span>
            </label>
          </div>
        </>
      ) : (
        <>
          <input
            onChange={(e) => uploadImage(setCoverLoading, setCover, e)}
            type="file"
            name="cover"
            id="cover"
            className="media-input"
          />
          <div className="upload">
            <label htmlFor="cover">
              <PreviewPic src={cover} /> Change Cover
            </label>
          </div>
        </>
      )}

      <LocationContainer>
        <div className="text">
          <BsFillGeoAltFill />
          <label>Select the Communitie's Location:</label>
          <BsFillGeoAltFill />
        </div>

        <div className="buttons">
          <LocationButton type="button">My Current Location</LocationButton>
          <LocationButton
            type="button"
            onClick={() => {
              setShowLocationForm(!showLocationForm);
            }}
          >
            Select A Different Location
          </LocationButton>
        </div>
      </LocationContainer>

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

      <SubmitButton type="submit">Create</SubmitButton>
    </Background>
  );
}

const LocationContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .text {
    padding: 10px;
    display: flex;
    justify-content: space-around;
    > label {
      font-size: 14px;
      text-align: center;
    }
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    width: 80%;
  }
  > svg {
    font-size: 20px;
  }
`;

const LocationButton = styled.button`
  all: unset;
  border: 2px solid ${colors.orange};
  margin-bottom: 10px;
  width: 40%;
  height: 60px;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
`;
