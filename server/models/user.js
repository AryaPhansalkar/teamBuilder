import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: {
        type: String
    },
    username: {
        type: String, required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String 
    },
      pokemonTeam: {
    type: [
      {
        pokemon: {
          value: Number,
          label: String,
        },
        moves: [String],
      }
    ],
    default: [],
  },
});

const User = mongoose.model('User', userSchema);
export default User;