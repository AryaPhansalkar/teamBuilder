export function isAuthenticated(req, res, next) {
   console.log("Cookies:", req.cookies);
  console.log("Session:", req.session);
  console.log("User:", req.user);
  console.log("isAuthenticated:", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("User not authenticated middleware");
    res.status(401).json({ message: "Unauthorized" });
  }
}