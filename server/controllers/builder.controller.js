export const getBuilderData = (req, res) => {
  const username = req.user?.username || req.user?.email || 'user';
  console.log(`✅ Builder data sent for user: ${username}`);
  res.json({username});
};

