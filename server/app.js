import dotenv from 'dotenv';
import express from "express";
import session from "express-session";
import passport from "passport";
import MongoStore from 'connect-mongo';
import "./config/passport.js";
import authRoutes from "./routes/auth.routes.js";
import builderRoutes from "./routes/builder.routes.js";
import cors from "cors";

const app = express();
dotenv.config();


app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use((req, res, next) => {
  console.log("starting backend");
  console.log("Using CORS origin:", process.env.FRONTEND_URL);
  console.log("CORS already applied, path:", req.path);
  next();
});

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "none", //set for production
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api', builderRoutes);
export default app;
