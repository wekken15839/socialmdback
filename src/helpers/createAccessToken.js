import jwt from "jsonwebtoken"
import { accessTokenSecretKey } from "../../config.js"

export const createAcessToken = (userId) => new Promise((resolve, reject) => {

  jwt.sign(userId, accessTokenSecretKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      reject(err);
    } else {
      resolve(token)
    }
  })
})