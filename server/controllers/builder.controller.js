export const getBuilderData = (req, res) => {
  const username = req.user?.username || req.user?.email || 'user';
  res.json({username});
  console.log(`✅ Builder data sent for user: ${username}`);
};

