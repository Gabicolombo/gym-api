import { Router } from 'express';
import WorkoutExerciseController from '../controllers/workoutExercise';
import authenticateToken from '../middleware/auth';

const router = Router();

router.post('/creating', authenticateToken, async(req, res) => {
  await WorkoutExerciseController.createWorkoutExercise(req, res);
})

export default router;