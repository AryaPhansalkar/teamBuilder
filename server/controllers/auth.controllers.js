import User from "../models/user.js";
import passport from 'passport';
import bcrypt from 'bcryptjs';
export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({
      username,
      email,
      password: await EncryptPassword(password),
    });
    await newUser.save();

    // Auto login the user
    req.login(newUser, (err) => {
      if (err) return next(err);
      return res.status(201).json({ message: "User registered and logged in", user: newUser });
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const googleCallbackHandler = async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      user = await User.create({
        username: profile.displayName,
        email: profile.emails?.[0].value || '',
        googleId: profile.id,
        isVerified: true
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
};

export const login = async (req, res,next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.login(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
}

export const googleLoginSuccess = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }

  console.log(`Google login successful for: ${req.user.email}`);
  res.redirect(process.env.FRONTEND_URL + '/builder');
};

export const googleLoginFailure = (req, res) => {
  res.redirect(process.env.FRONTEND_URL + '/signup');
};

export const EncryptPassword = async(plainPassword)=>{
    const saltround = 10;
    const hashpassword = await bcrypt.hash(plainPassword,saltround);
    return hashpassword;
};

export const compare = async(plainPassword,hashedPassword) =>{
    const check = await bcrypt.compare(plainPassword,hashedPassword)
    return check;
};