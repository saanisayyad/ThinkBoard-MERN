import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'

import router from "./src/routes/notesRoutes.js";
import rateLimiter from "./src/middleware/rateLimiter.js";
import { connectDB } from "./src/config/db.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000

//middleware
app.use(cors());

app.use(express.json());
app.use(rateLimiter);

//routes
app.use("/api/note", router);

// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static(path.join(__dirname, '../frontend/dist')))


// app.get('/*path', (req, res) =>{
//   res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
// })
// }

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started at port: ", process.env.PORT);
  });
});
// app.get('/api/note',(req, res)=>{
//     res.send('You got 10 notes')

// })

// app.post('/api/note',(req, res)=>{
//     res.json({message:'Note created'})
// })

// app.put('/api/note/:id',(req, res)=>{
//     res.json({message:'Note updated'})
// })

// app.delete('/api/note',(req, res)=>{
//     res.json({message:'Note deleted'})
// })

