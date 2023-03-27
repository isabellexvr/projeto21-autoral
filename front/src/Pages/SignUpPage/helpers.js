import api from "../../Services/Api/api.js";

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const uploadImage = async (setUrl, event) => {
  event.preventDefault();

  const file = event.target.files[0];
  const hashed = await convertBase64(file);

  api
    .post("/upload-images", { image: hashed })
    .then((res) => {
      setUrl(res.data);
      console.log(res.data)
      alert("deu bom")

    })
    .catch((err) => {
      console.log(err)
      alert("Algo deu errado ao importar a foto.");

    });
};
