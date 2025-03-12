import userRoutes from "./routes/user";

import {https} from "firebase-functions";
import express from "express";

const app = express();

app.get("/", (req, res) => res.status(200).send("Hey there!"));
app.use("/api", userRoutes);

exports.app = https.onRequest(app);
