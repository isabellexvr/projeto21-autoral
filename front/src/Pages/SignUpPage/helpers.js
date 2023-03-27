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

export const uploadImage = async (event) => {
  event.preventDefault();

  const file = event.target.files[0];
  const hashed = await convertBase64(file);
  setLoading(true);
  api
    .post("/upload-images", { image: hashed })
    .then((res) => {
      setUrl(res.data);
      setLoading(false);
    })
    .catch((err) => {
      alert("Algo deu errado ao importar a foto.");
      setLoading(false);
    });
};
