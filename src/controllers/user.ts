import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

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

  public static async loginUser(req: Request, res: Response): Promise<Response> {
    try{
      const {email, password} = req.body;

      const existingUser = await User.findOne({where: {email: email}});

      if(!existingUser) return res.status(404).json({error: 'User not found'});

      const hashPassword = await User.comparePassword(password, existingUser.password);

      if(!hashPassword) return res.status(404).json({error: 'Invalid information'});

      const token = jwt.sign({userId: existingUser.id}, process.env.SECRET as string, 
              {expiresIn: '5m'}
      );

      res.cookie('token', token, { httpOnly: true });
      res.cookie('userId', existingUser.id, { httpOnly: true });
      return res.json({ message: 'Login successful' });

    }catch(err){
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  }
}

export default UserController;