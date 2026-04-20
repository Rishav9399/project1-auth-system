import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.controller';
import { protectRoute } from '../middleware/auth.middleware';

const router = Router();

// POST /api/auth/register
router.post('/register', register);
router.post('/login', login); // <--- Add this new route!

// Notice how 'protectRoute' sits BEFORE 'getProfile'? That's the Bouncer checking the door!
router.get('/profile', protectRoute, getProfile);

export default router;