import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import chat from "./routes/chats.js";
import auth from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb" }));

app.use("/chat", chat);
app.use("/auth", auth);

export default app;
