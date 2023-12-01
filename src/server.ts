import dotenv from "dotenv";
dotenv.config();

import express from "express";
import db from "./database/database";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.listen(PORT, () => {
    console.log("Server is up!");

    db.connect();
});