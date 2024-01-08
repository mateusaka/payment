import dotenv from "dotenv";
dotenv.config();

import express from "express";
import db from "./database/database";

import indexRouter from "./routes/index";
import paymentRouter from "./routes/payment";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/", indexRouter);
app.use("/payment", paymentRouter);

app.listen(PORT, () => {
    console.log("Server is up!");
    
    db.connect();
});