import { Router } from 'express';
import UserController from '../controllers/user';

const router = Router();

router.post('/create-user', async (req, res) => {
  await UserController.createUser(req, res);
});

export default router;