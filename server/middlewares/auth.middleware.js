import { decodeToken } from "../methods/auth.method.js";
import User from "../models/user.model.js";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export async function requireAuth(req, res, next) {
  const accessToken = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!accessToken) {
    return res.status(401).send("Access token not found");
  }
  const decoded = await decodeToken(accessToken, accessTokenSecret);
  if (!decoded) {
    return res.status(401).send('Invalid access token');
  }
  
  const username = decoded.payload.username;
  const user = await User.findOne({username});
  if (!user) {
    return res.status(401).send('User does not exist');
  }
  res.locals.user = user;
  next();
}