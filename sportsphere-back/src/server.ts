import express from "express"
import cors from "cors";

const app = express();

app
    .use(cors())
    .use(express.json())
    .get("/health", (req, res) => res.sendStatus(200));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`)
});
