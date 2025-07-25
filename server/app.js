import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";
import authRoutes from "./routes/auth.routes.js";
import builderRoutes from "./routes/builder.routes.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
     cookie: {
      httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7 
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api', builderRoutes);
export default app;
