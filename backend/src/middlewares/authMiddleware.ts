import type { Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { decodedTokenPayload } from "../types.js";

declare global {
  namespace Express {
    interface Request {
      userData?: decodedTokenPayload;
    }
  }
}

const jwtSecret = process.env.JWT_TOKEN || '123456789'

const authenticateToken = (
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    const token = req.cookies.token

    if(!token){
      return res.status(401).json({error:"Token not found."})
    }

    try{
        const decoded = jwt.verify(token,jwtSecret) as decodedTokenPayload
        req.userData = {...decoded}
        next()
    }catch(err){
         return res.status(403).json({error:"Token expired."})
    }
   
}

export default authenticateToken