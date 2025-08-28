// export const getBuilderData = (req, res) => {
//   const username = req.user?.username || req.user?.email || 'user';
//   res.json({username});
//   console.log(`✅ Builder data sent for user: ${username}`);
// };

export const getBuilderData = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("👤 Full req.user object:", req.user);
    const username = req.user.username;

    res.json({ username });
    console.log(`✅ Builder data sent for user: ${username}`);
  } catch (err) {
    console.error("❌ Error in getBuilderData:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
