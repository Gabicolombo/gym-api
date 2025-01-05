import { Request, Response } from 'express';
import WorkoutExercise from '../models/workoutExercise';
import Exercise from '../models/exercise';
import Workout from '../models/workouts';

class WorkoutExerciseController {
  public static async createWorkoutExercise(req: Request, res: Response): Promise<Response> {
    try{
      const { exerciseId, workoutId } = req.body;

      const resultExercise = await Exercise.findOne({where: { id: exerciseId}});

      if(!resultExercise) {
        return res.status(400).json({error: "Invalid exerciseId"});
      }

      const resultWorkout = await Workout.findOne({where: { id: workoutId}});

      if(!resultWorkout) return res.status(400).json({error: "Invalid workoutId"});

      const newWorkoutExercise = await WorkoutExercise.create(req.body);

      return res.status(200).json({ success: true, newWorkoutExercise: newWorkoutExercise })

    }catch(err){
      console.error(err);
      return res.status(500).json({error: err});
    }
  }
}

export default WorkoutExerciseController;