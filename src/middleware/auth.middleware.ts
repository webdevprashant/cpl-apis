import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

export const authenticateJWT = (req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {
    const tokenSecret = process.env.token_secret as string;
    if (req.headers.authorization) {
      jwt.verify(req.headers.authorization, tokenSecret, (err) => {
        if (err) {
          return res.status(403).json({
            status: false,
            message: "Unauthorized. Please check token or credentials."
          })
        }
        next();
      });
    } else {
     return res.status(401).json({
      status: false,
      message: `Unauthorized. Could not find token.`
     });
    }
  } catch (err) {
    return res.status(403).json({
      status: false,
      message: `Unauthorized. Please check token.`
    });
  }
}