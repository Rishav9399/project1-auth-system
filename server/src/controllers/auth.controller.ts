import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service';
import { generateTokenAndSetCookie } from '../utils/generateToken';
import { AuthRequest } from '../middleware/auth.middleware';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Grab data from the request body
    const { name, email, password } = req.body;

    // 2. Basic validation (We will add advanced validation later)
    if(!name || !email || !password){
      res.status(400).json(({ message: 'Please provide all required feilds' }));
      return;
    }
    // 3. Call out fat service
    const user = await registerUser({ name, email, password });

      // 4.Send the success response.
    res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  } catch (error: any) {
    // 5. Handle errors (like email alredy exists)
    if (error.message === 'Email is alredy registered') {
      res.status(409).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Please provide email and password' });
      return;
    }

    // 1. Cat the fat service to verify credentials
    const user = await loginUser(email, password);

    // 2. Generate the VIP token and bake the HttpOnly cookie
    // We must convert the MongoDB ObjectId to a string!
    generateTokenAndSetCookie(user._id.toString(), res);

    // 3. Send the success response
    res.status(200).json({
      message: 'Login successful',
      user,
    });
  } catch (error: any) {
    // 401 Unathorized is the proper status code for bad credentials
    res.status(401).json({ message: error.message });
  }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // If the Bouncer let them in, req.user will be here!
    const user = req.user;

    res.status(200).json;

    res.status(200).json({
      message: 'Welcome to the VIP room',
      user,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error' });
  }
};