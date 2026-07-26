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
    unique: true,
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
  resetPasswordToken: {
    type: String,
    default: undefined,
    select: false,
  },
  resetPasswordExpires: {
    type: Date,
    default: undefined,
    select: false,
  },
  address: {
    fullname: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    addressLine: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
      match: [/^\d{6}$/, "Pincode must be 6 digits"],
    },
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
