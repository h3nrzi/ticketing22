import mongoose from "mongoose";

// An interface that describe the properties, that are require to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// Schema for User model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Build User model
const User = mongoose.model("User", userSchema);

function buildUser(attrs: UserAttrs) {
  return new User(attrs);
}

export default User;
