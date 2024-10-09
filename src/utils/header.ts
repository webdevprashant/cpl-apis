import { Request, Response, NextFunction } from "express";
export default async function setHeaders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );

  // If the request is preflight (OPTIONS), respond with 200 status
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
}