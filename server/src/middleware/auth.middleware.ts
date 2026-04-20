import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';

// We have to extend the normal Express Request so TypeScript lets us attach the user to it!
export interface AuthRequest extends Request {
  user?: any;
}

export const protectRoute = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // 1. Grab the VIP wristband from the cookies
    const token = req.cookies.jwt;

    if(!token) {
      res.status(401).json({ message: 'Unathorized - No Token Provided' });
      return;
    }

    // 2. Verify the wristband is real (not forged)
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {userId: string };

    // 3. Find the user in the database (but strip out the password)
    const user = await User.findById(decoded.userId).select('-password');

    if(!user){
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // 4. Attach th user to the request so the controller can use it!
    req.user = user;

    // 5. Let them in! (Move to the next function/controller)
    next();
  } catch (error: any) {
    console.error('Error in protectRoute middleware:', error.message);
    res.status(401).json({ message: 'Unauthorized - Invalid Token' });
  }
};