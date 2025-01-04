import { Request, Response } from 'express';
import Exercise  from '../models/exercise';

class ExerciseController {
  public static async getAllExercises(req: Request, res: Response): Promise<Response>{
    try{
       const exercises = await Exercise.findAll();

       return res.status(200).json(exercises);

    }catch(err){
      console.error(err);
      return res.status(500).json({error: err});
    }
  }
}

export default ExerciseController;