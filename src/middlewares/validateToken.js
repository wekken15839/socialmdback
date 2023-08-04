import jwt from "jsonwebtoken";
import { accessTokenSecretKey } from "../../config.js";

export const validateToken = async (req, res, next) => {

  const { accessToken } = req.cookies;

  try {

    if (!accessToken) return res.status(401).json({ message: "no token, unauthorized" });

    jwt.verify(accessToken, accessTokenSecretKey, (err, payload) => {
      if (err) return res.status(401).json({ message: "invalid token, unauthorized" });
      req.user = payload.id;
      next();
    })

  } catch (error) {
    console.log(error.message)
  }



}