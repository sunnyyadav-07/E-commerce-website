import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  contact: {
    type: Number,
    required: function () {
      return this.authProvider === "local";
    },
  },
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: function () {
      return this.authProvider === "local";
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  role: {
    type: String,
    enum: ["buyer", "seller"],
    default: null,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
const userModel = mongoose.model("user", userSchema);
export default userModel;
