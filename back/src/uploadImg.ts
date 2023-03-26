import dotenv from "dotenv";
const cloudinary = require('cloudinary').v2;

dotenv.config();

console.log(process.env.API_KEY)


cloudinary.config({
    cloud_name: "dbxhasetw",
    api_key: "864955728139747",
    api_secret: "QKTkw6Dhn7o6TyckwLvq90HVUkI"
  });

const opts = {
    overwrite: true,
    invalidade: true,
    resource_type: "auto"
};

module.exports = (image: any) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (error, result) => {
            if (result && result.secure_url) {
                console.log(result.secure_url);
                return resolve(result.secure_url);
            }
            console.log(error.message);
            return reject({ message: error.message })
        })
    })
}