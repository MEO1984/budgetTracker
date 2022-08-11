import express from "express";
import mongoose from "mongoose";
import logger from "morgan";
import compression from "compression";
import router from "./routes/api.js"

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(compression());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget",
{
    useNewUrlParser: true,
    // useFindandModify: false
});

app.use(router);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})