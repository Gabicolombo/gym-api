import { Router } from 'express';
import ExerciseController from '../controllers/exercise';
import authenticateToken, {Authenticate}  from '../middleware/auth';

const router = Router();

router.get('/getAllExercises', authenticateToken, async(req: Authenticate, res) => {
  await ExerciseController.getAllExercises(req, res);
});

export default router;