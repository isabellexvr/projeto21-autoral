import express from "express";
import cors from "cors";
import { communitiesRouter, publicationsRouter, usersRouter, likesRouter, commentsRouter, categoriesRouter } from "./routes";
const uploadImage = require("./uploadImg")

const app = express();

app
    .use(cors())
    .use(express.json({ limit: "25mb" }))
    .use(express.urlencoded({ limit: "25mb", extended: true }))
    .get("/health", (req, res) => res.sendStatus(200))
    .use("/users", usersRouter)
    .use("/publications", publicationsRouter)
    .use("/communities", communitiesRouter)
    .use("/likes", likesRouter)
    .use("/comments", commentsRouter)
    .use("/categories", categoriesRouter)
    ;
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`)
});

export default app;