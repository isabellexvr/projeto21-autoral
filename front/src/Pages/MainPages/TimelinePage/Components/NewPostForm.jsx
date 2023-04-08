import {
  ModalTitle,
  ModalHeader,
  NewPostContent,
  SubmitPostButton,
  HandlingMedia,
} from "./NewPostStyles";
import { RiCloseCircleFill } from "react-icons/ri";
import { useState } from "react";
import api from "../../../Services/Api/api.js";
import { uploadImage } from "../../../Services/Api/uploadImage";
import { ThreeDots } from "react-loader-spinner";

export default function NewPostForm({
  userInfo,
  theme,
  setIsModalOpened,
  loading,
  setLoading,
}) {
  const [form, setForm] = useState({});
  const [media, setMedia] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  function handleForm({ target: { value, name } }) {
    setForm({ ...form, [name]: value });
    console.log(form);
  }

  function sendForm(e) {
    e.preventDefault();
    setLoading(true);
    console.log(form);
    let finalObj;
    media ? (finalObj = { ...form, media }) : (finalObj = { ...form });

    api
      .post("/publications/new", finalObj, {
        headers: { Authorization: "Bearer " + userInfo.token },
      })
      .then((res) => {
        alert("Successfully publicated!");
        setIsModalOpened(false);
        setLoading(false);
      })
      .catch((err) => {
        alert("Something went wrong while publicating!");
        setLoading(false);
        console.log(err.response);
      });
  }

  return (
    <>
      <ModalTitle theme={theme}>
        <h1>Create A New Post</h1>
      </ModalTitle>
      <ModalHeader theme={theme}>
        <div className="left-container">
          <img src={userInfo.picture} />
          <div className="username-select">
            <h1>{userInfo.fullName}</h1>
            <h2>@{userInfo.userName}</h2>
            <select name="postType" onChange={handleForm}>
              <option>My Timeline</option>
              <option>Chess Comunity</option>
            </select>
          </div>
        </div>
        <div className="right-container">
          <div className="close-button">
            <RiCloseCircleFill onClick={() => setIsModalOpened(false)} />
          </div>
        </div>
      </ModalHeader>
      <NewPostContent theme={theme}>
        <textarea
          placeholder="What's up?"
          className="description"
          name="description"
          onChange={handleForm}
        ></textarea>

        {uploadLoading ? (
          <HandlingMedia theme={theme}>
            <ThreeDots
              height="25"
              width="25"
              radius="9"
              color={theme.fontColor}
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </HandlingMedia>
        ) : !media ? (
          <>
            <input
              onChange={(e) => uploadImage(setUploadLoading, setMedia, e)}
              type="file"
              name="file"
              id="file"
              className="media"
            />
            <div className="upload">
              <label htmlFor="file">Add Some Media</label>
            </div>
          </>
        ) : (
          <>
            <input
              onChange={(e) => uploadImage(setUploadLoading, setMedia, e)}
              type="file"
              name="file"
              id="file"
              className="media"
            />
            <div className="upload">
              <h1>Preview:</h1>
              <img src={media} />
              <label htmlFor="file">Change</label>
            </div>
          </>
        )}
      </NewPostContent>
      <SubmitPostButton theme={theme} type="submit" onClick={sendForm}>
        Post
      </SubmitPostButton>
    </>
  );
}
