import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
    const [url, setUrl] = useState("")

    const convertBase64 = (file: any) => {
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

    const uploadImage = async (event: any) => {
        const file = event.target.files[0];
        const hashed = await convertBase64(file);
        axios
            .post("http://localhost:3000/upload-images", { image: hashed })
            .then(res => {
                setUrl(res.data);
                alert("deu bom")
            })
            .catch(err => console.log(err))
    };
    return (
        <>
            <input onChange={uploadImage} type="file"></input>
            <br/>
            olha a imagem aqui >>><img src={url} />
        </>
    )
}

