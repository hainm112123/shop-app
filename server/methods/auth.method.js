import jwt from "jsonwebtoken";
import { promisify } from "util";

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

export async function generateToken(payload, secretSignature, tokenLife) {
  try {
    return await sign(
      {
        payload,
      },
      secretSignature,
      {
        algorithm: 'HS256',
        expiresIn: tokenLife,
      }
    )
  } catch(err) {
    console.error(`Error in generate access token ${err}`);
    return null;
  }
}

export async function decodeToken(token, secretKey) {
  try {
    return await verify(token, secretKey);
  } catch(err) {
    console.error(`Error in decode access token ${err}`);
    return null;
  }
}