import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const UserSchema = mongoose.model("user", userSchema);
export default UserSchema;
