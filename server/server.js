import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from 'express';
import app from "./app.js";
import "./config/passport.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors';
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB error:", err);
    process.exit(1);
  }
};

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ✅ Serve static files from the React app
// app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// // ✅ Catch-all handler: for any request that doesn't match an API route, send back React's index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
// });


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

app.use(cors({
  origin: 'http://localhost:3000', // ✅ your frontend
  credentials: true,               // ✅ allow cookies
}));
