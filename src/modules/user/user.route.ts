import { Response, Router } from 'express';
import { registerUser, loginUser } from './user.controller';
import { verifyToken, AuthRequest } from '../../middleware/auth.middleware';

import { validateSchema } from '../../middleware/validate.middleware';
import { registerSchema, loginSchema } from './user.validation';
import { UserModel } from './user.model';

export const userRouter = Router();


userRouter.post('/register', validateSchema({body: registerSchema}), registerUser);


userRouter.post('/login', validateSchema({body: loginSchema}), loginUser);


userRouter.get('/me', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId).select('-password');
     console.log('UserId in route:', req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

