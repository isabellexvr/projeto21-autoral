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

export default function NewCommunityForm({ token, theme, navigate }) {
  const [form, setForm] = useState({});
  const [categories, setCategories] = useState([]);

  const [icon, setIcon] = useState(null);
  const [cover, setCover] = useState(null);
  const [category, setCategory] = useState(null);

  const [iconLoading, setIconLoading] = useState(false);
  const [coverLoading, setCoverLoading] = useState(false);

  function handleForm({ target: { value, name } }) {
    setForm({ ...form, [name]: value });
  }

  function sendForm(e) {
    e.preventDefault();
    let finalObj;

    if(!category ) {
      alert("Please, choose an category")
      return
    }

    finalObj = {
      ...form,
      categoryId: Number(category),
      createdAt: new Date().toISOString(),
      icon,
      cover,
    };

    console.log(finalObj)

     api.post("/communities/create", finalObj, {
      headers: { Authorization: "Bearer " + token },
    }).then(res => {
      navigate("/timeline")
      alert('Community created')
      console.log(res.data)

    }).catch(err => console.log(err))
  }

  useEffect(() => {
    api
      .get("/categories/find-all")
      .then((res) => {
        console.log(res.data);
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
      <SubmitButton type="submit">Create</SubmitButton>
    </Background>
  );
}
