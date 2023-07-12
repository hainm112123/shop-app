import User from "../models/user.model.js";

import { generateToken } from "../methods/auth.method.js";

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(401).send("Wrong Username or Password");
  }
  
  const dataForAccessToken = {
    username,
  }

  const accessToken = await generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife)

  return res.json({
    msg: "Login Success",
    accessToken
  })
}