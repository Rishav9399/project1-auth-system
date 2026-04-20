import * as jwt from 'jsonwebtoken';
import { Response } from 'express';

export const generateTokenAndSetCookie = (userId: string, res: Response) => {
  // 1. Create the JWT
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '15d', // Token lasts for 15 days
  });
  
  // 2. Bake it intop an HttpOnly cookie
  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // PREVENTS XSS ATTACKS (JavaScript cannot read this)
    sameSite: 'strict', // PREVENTS CSRF ATTACKS
    secure: process.env.NODE_ENV !== 'development', // Only use HTTPS in production 
  });

  return token;
}