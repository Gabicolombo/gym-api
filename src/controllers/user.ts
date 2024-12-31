import { Request, Response } from 'express';
import User from '../models/user';


class UserController {
  public static async createUser(req: Request, res: Response): Promise<Response> {
    try{
      const { name, email, password } = req.body;

      const user = await User.findOne({ where: { email }});
      if(user) return res.status(400).json({error: 'Email already in use'});

      const hashPassword = await User.hashPassword(password);

      const newUser = await User.create({name, email, password: hashPassword});

      return res.status(200).json({success: true, userId: newUser.id});
    }catch(err){
      console.error(err);
      return res.status(500).json({error: err});
    }
  }
}

export default UserController;