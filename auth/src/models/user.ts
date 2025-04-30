import mongoose, { Schema, Model, Document } from "mongoose";

// An interface that describe the properties
// that are require to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends Document {
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends Model<UserDoc> {
  build: (attrs: UserAttrs) => UserDoc;
}

// Schema for User model
const userSchema = new Schema({
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
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// Create a new User instance
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

export default User;
