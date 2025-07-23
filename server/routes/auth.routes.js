import express from 'express';
import { register } from '../controllers/auth.controllers.js';
import { login } from '../controllers/auth.controllers.js';
import { googleLoginSuccess, googleLoginFailure } from '../controllers/auth.controllers.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import passport from "passport";
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// Redirect to Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" }));

// Google callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/signup',
    session: true,
  }),
   function (req, res) {
    console.log('✅ Google login successful for:', req.user.email);
    res.redirect('http://localhost:3000/builder');
  }
);

// 🟢 Initiate Google Login
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account', // ensures Google login screen shows
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/auth/google/failure',
    session: true,
  }),
  googleLoginSuccess
);

router.get('/google/failure', googleLoginFailure);

router.get('/builder-data', isAuthenticated, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!` });
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed", error: err });
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: "Session destroy failed", error: err });
      res.clearCookie("connect.sid", { path: "/" });
      return res.json({ message: "Logged out successfully" });
    });
  });
});
export default router;

