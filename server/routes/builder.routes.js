import express from "express";
import { getBuilderData } from "../controllers/builder.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import User from '../models/user.js';

const router = express.Router();

router.get("/builder-data", isAuthenticated, getBuilderData);

router.post('/save-team', (req, res) => {
  if (!req.user) {
    console.log("User not authenticated");
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { team } = req.body;
  console.log("Saving team for user:", req.user._id, "Team:", team);

  User.findByIdAndUpdate(req.user._id, { pokemonTeam: team })
    .then(() => res.json({ message: 'Team saved' }))
    .catch(err => {
      console.error("Error saving team:", err);
      res.status(500).json({ error: err.message });
    });
});


router.get('/load-team', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ team: user.pokemonTeam || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

