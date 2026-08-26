import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'

import router from "./src/routes/notesRoutes.js";
import { connectDB } from "./src/config/db.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000

//middleware
app.use(cors());

app.use(express.json());

//routes
app.use("/api/note", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started at port: ", process.env.PORT);
  });
});


