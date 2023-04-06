import express from "express";
import cors from "cors";
import { publicationsRouter, usersRouter } from "./routes";
const uploadImage = require("./uploadImg")

const app = express();

app
    .use(cors())
    .use(express.json({ limit: "25mb" }))
    .use(express.urlencoded({ limit: "25mb", extended: true }))
    .get("/health", (req, res) => res.sendStatus(200))
    .use("/users", usersRouter)
    .use("/publications", publicationsRouter)
    ;
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`)
});

export default app;