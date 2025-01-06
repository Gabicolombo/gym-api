import { Request, Response } from 'express';
import WorkoutExercise from '../models/workoutExercise';
import Exercise from '../models/exercise';
import Workout from '../models/workouts';
import { Authenticate } from '../middleware/auth';

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

  public static async getWorkout(req: Authenticate, res: Response): Promise<Response> {
    try{
      const workoutId = Number(req.query.id);

      /**
        select e.id as exercise_id,
          e.name as exercise_name,
          we.sets,
          we.repetitions,
          w.name
        from workouts w
        inner join workout_exercise we on w.id = we."workoutId"
        inner join exercises e on we."exerciseId" = e.id
        where w."userId" = 3 and w.id = 1;
       */
      const workout = await Workout.findAll({
        where: { id: workoutId, userId: req.user ? req.user.userId : undefined },
        include: [{
          model: WorkoutExercise,
          include: [{
            model: Exercise,
            attributes: ['id', 'name']
          }]
        }]
      });

      return res.status(200).json(workout);

    }catch(err){
      console.error(err);
      return res.status(500).json({error: err});
    }
  }
}

export default WorkoutExerciseController;