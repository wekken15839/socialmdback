import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createAcessToken } from "../helpers/createAccessToken.js";

export const signup = async (req, res) => {
  const { firstname, lastname, email, username, password, photo, gender, birthdate } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (userFound) return res.status(400).json({ message: "email already in use" });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ firstname, lastname, username, email, password: passwordHash, birthdate, gender })
    await newUser.save();

    const token = await createAcessToken({ id: newUser._id });

    res.cookie('accessToken', token)
    res.status(200).json(newUser)

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {

  try {

    if (req.error) {
      return res.status(500).json({ message: req.error })
    }

    const { user } = req;

    const userFound = await User.findByIdAndUpdate(user, req.body, { new: true }).select("-password");


    if (!userFound) return res.status(400).json({ message: "user not found" })

    return res.status(200).json(userFound);

  } catch (error) {
    return res.status(500).json({ message: error })
  }


}


export const login = async (req, res) => {

  const { email, password } = req.body;

  try {
    const userFound = await User.findOneAndUpdate({ email }, { lastLogin: new Date() });

    if (!userFound) return res.status(400).json({ message: "email doesn't exists" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(400).json({ message: "incorrect password" });

    userFound.password = undefined;


    const token = await createAcessToken({ id: userFound._id });

    res.cookie("accessToken", token,);
    res.status(200).json(
      userFound
    )
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }

}

export const logout = async (req, res) => {

  try {
    res.cookie('accessToken', '', { expires: new Date(0) });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

export const profile = async (req, res) => {

  const { user } = req;

  try {
    const userFound = await User.findById(user).select('-password');

    res.status(200).json(
      userFound
    )

  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }

}
