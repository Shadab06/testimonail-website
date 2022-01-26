import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Routers from "./routers/testimonials.js"
const app = express();

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();


const PORT = process.env.PORT || 5000;
app.use("/", Routers);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => app.listen(PORT, () => console.log(`Server running to PORT: ${PORT}`)))
    .catch(error => console.log(error));