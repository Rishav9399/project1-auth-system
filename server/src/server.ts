import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/db';
import cookieParser from 'cookie-parser';

// 1. 
import authRoutes from './routes/auth.routes';

// Load environment variables.
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Global Middlewarre
app.use(helmet()); // Secures your HTTP header.
app.use(cors()); // Allows your future frontend to talk to this API.
app.use(express.json()); // ALlows your server to read JSON bodies.
app.use(express.json());
app.use(cookieParser());  // <--- Stella's new rule: Read the cookies!

// 2. 
app.use('/api/auth', authRoutes);

// Health Check Endpoint.
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Stella says: The server is alive , Rishav. Never underestimate a tiny projects because tiny ones when combine make things bigger and that will actually blow minds.',
  });
});

// Start Server.
app.listen(PORT, ()=> {
  console.log(`🚀 Server is running on the port ${PORT}`);
});