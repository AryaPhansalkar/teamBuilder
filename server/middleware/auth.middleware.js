export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("User not authenticated middleware");
    res.status(401).json({ message: "Unauthorized" });
  }
}