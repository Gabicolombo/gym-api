import { Router } from 'express';
import Workouts from '../controllers/workout';
import authenticateToken from '../middleware/auth';

const router = Router();

router.post('/creating-workouts', authenticateToken, async(req, res) => {
   await Workouts.createWorkout(req, res);
});

export default router;