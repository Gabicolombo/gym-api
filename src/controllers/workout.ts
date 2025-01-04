import { Request, Response } from 'express';
import Workout from '../models/workouts';

class WorkoutController {
  public static async createWorkout(req: Request, res: Response): Promise<Response> {
    try{

      req.body.userId = req.cookies.userId;
      const newWorkout = await Workout.create(req.body);

      return res.status(200).json({ success: true, newWorkout: newWorkout })

    }catch(err){
      console.error(err);
      return res.status(500).json({error: err});
    }
  }
}

export default WorkoutController;