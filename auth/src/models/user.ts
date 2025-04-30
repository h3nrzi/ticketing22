import mongoose from "mongoose";

// An interface that describe the properties, that are require to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<any> {
  build: (attrs: UserAttrs) => any;
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
const User = mongoose.model<any, UserModel>("User", userSchema);

// Create a new User instance
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

export default User;
