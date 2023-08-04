import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    lastLogin: { type: mongoose.Schema.Types.Date },
    password: { type: String, required: true },
    photo: { type: String, default: "userdefaultphoto.jpg" },
    birthdate: {
      type: Date,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
