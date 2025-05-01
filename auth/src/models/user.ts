import mongoose, { Schema, Model, Document } from "mongoose";
import { Password } from "../services/password";

// Interface for User attributes
interface UserAttrs {
  email: string;
  password: string;
}

// Interface for User document
interface UserDoc extends Document {
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
}

// Interface for User model
interface UserModel extends Model<UserDoc> {
  build: (attrs: UserAttrs) => UserDoc;
}

//---------------------------------------------------//

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

// Static method to build a User
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// Hash the password before saving the user
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

//---------------------------------------------------//

// Build User model
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export default User;
